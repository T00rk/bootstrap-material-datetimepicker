(function (moment, $) {
  var pluginName = "bootstrapMaterialDatePicker";
  var moduleName = "ngMaterialDatePicker";
  var pluginDataName = "plugin_" + pluginName;

  var VIEW_STATES = {
    DATE: 0,
    HOUR: 1,
    MINUTE: 2
  };

  moment.locale('en');

  var template = '<md-dialog class="dtp" layout="column" style="width: 300px;">'
    + '    <md-dialog-content class="dtp-content">'
    + '        <div class="dtp-date-view">'
    + '            <header class="dtp-header">'
    + '                <div class="dtp-actual-day" ng-show="picker.dateMode">{{picker.currentDate.format("dddd")}}</div>'
    + '                <div class="dtp-actual-day" ng-show="picker.timeMode">{{picker.params.shortTime ? picker.currentDate.format("A") : " "}}</div>'
    + '                <div class="dtp-close text-right">'
    + '                    <a href="#" ng-click="picker.hide()"><i class="material-icons">clear</i></a>'
    + '                </div>'
    + '            </header>'
    + '            <div class="dtp-date" ng-show="picker.params.date">'
    + '                <div>'
    + '                    <div class="left center p10"><a href="#" class="dtp-select-month-before" ng-click="picker.selectMonthBefore()" ng-class="{invisible: !picker.isPreviousMonthVisible()}"><i class="material-icons">chevron_left</i></a>'
    + '                    </div>'
    + '                    <div class="dtp-actual-month p80">{{picker.currentDate.format("MMM") | uppercase}}</div>'
    + '                    <div class="right center p10">'
    + '<a href="#" class="dtp-select-month-after" ng-click="picker.selectMonthAfter()" ng-class="{invisible: !picker.isNextMonthVisible()}"><i class="material-icons">chevron_right</i></a>'
    + '                    </div>'
    + '                    <div class="clearfix"></div>'
    + '                </div>'
    + '                <div class="dtp-actual-num">{{picker.currentDate.format("DD")}}</div>'
    + '                <div>'
    + '                    <div class="left center p10">'
    + '           <a href="#" ng-class="{invisible: !picker.isPreviousYearVisible()}" class="dtp-select-year-before" ng-click="picker.selectYearBefore()"><i class="material-icons">chevron_left</i></a>'
    + '                    </div>'
    + '                    <div class="dtp-actual-year p80">{{picker.currentDate.format("YYYY")}}</div>'
    + '                    <div class="right center p10">' +
    '                       <a href="#" ng-click="picker.selectYearAfter()" ng-class="{invisible: !picker.isNextYearVisible()}" class="dtp-select-year-after"><i class="material-icons">chevron_right</i></a>'
    + '                    </div>'
    + '                    <div class="clearfix"></div>'
    + '                </div>'
    + '            </div>'
    + '            <div class="dtp-time" ng-show="picker.params.time && !picker.params.date">'
    + '                <div class="dtp-actual-maxtime">{{picker.currentDate.format("HH:mm")}}</div>'
    + '            </div>'
    + '            <div class="dtp-picker">'
    + '                <div mdc-datetime-picker-calendar date="picker.currentDate" picker="picker"' +
    ' class="dtp-picker-calendar"' +
    ' ng-show="picker.currentView ===' +
    ' picker.VIEWS.DATE"></div>'
    + '                <div class="dtp-picker-datetime" ng-hide="picker.currentView === picker.VIEWS.DATE">'
    + '                    <div class="dtp-actual-meridien">'
    + '                        <div class="left p20">'
    + '                            <a href="#" class="dtp-meridien-am" ng-class="{selected: picker.meridien == \'AM\'}" ng-click="picker.selectAM()">AM</a>'
    + '                        </div>'
    + '                        <div class="dtp-actual-time p60"></div>'
    + '                        <div class="right p20">'
    + '                            <a href="#" class="dtp-meridien-pm" ng-class="{selected: picker.meridien == \'PM\'}" ng-click="picker.selectPM()">PM</a>'
    + '                        </div>'
    + '                        <div class="clearfix"></div>'
    + '                    </div>'
    + '                    <div class="dtp-picker-clock"></div>'
    + '                </div>'
    + '            </div>'
    + '        </div>'
    + '    </md-dialog-content>'
    + '    <md-dialog-actions class="dtp-buttons">'
    + '            <md-button class="dtp-btn-cancel md-button" ng-click="picker.cancel()"> {{picker.params.cancelText}}</md-button>'
    + '            <md-button class="dtp-btn-ok md-button" ng-click="picker.ok()"> {{picker.params.okText}}</md-button>'
    + '      </md-dialog-actions>'
    + '</md-dialog>';

  angular.module(moduleName, ['ngMaterial'])
    .directive('mdcDatetimePicker', ['$mdDialog',
      function ($mdDialog) {

        return {
          restrict: 'A',
          scope: {
            currentDate: '=ngModel',
            time: '=',
            date: '=',
            minDate: '=',
            maxDate: '=',
            shortTime: '='
          },
          link: function (scope, element, attrs) {
            var scopeCopy = {};
            for (var i in attrs) {
              if (scope.hasOwnProperty(i) && !angular.isUndefined(scope[i])) {
                scopeCopy[i] = scope[i];
              }

              if (angular.isUndefined(attrs[i]) && scope.hasOwnProperty(i)) {
                delete attrs[i];
              }
            }

            var locals = {element: element, options: angular.extend({}, attrs, scopeCopy)};
            //@TODO custom event to trigger input
            element.focus(function (e) {
              $mdDialog.show({
                  template: template,
                  controller: PluginController,
                  controllerAs: 'picker',
                  locals: locals,
                  openFrom: element,
                  parent: angular.element(document.body),
                  bindToController: true
                })
                .then(function (v) {
                  scope.currentDate = v;
                })
              ;
            });
          }
        };
      }])
  ;

  var PluginController = function ($scope, $mdDialog, $timeout) {
    this.currentView = VIEW_STATES.DATE;
    this._dialog = $mdDialog;

    this.minDate;
    this.maxDate;

    this._attachedEvents = [];

    this.$element = $(this.element);
    this.VIEWS = VIEW_STATES;

    this.params = {
      date: true,
      time: true,
      format: 'YYYY-MM-DD',
      minDate: null,
      maxDate: null,
      currentDate: null,
      lang: 'en',
      weekStart: 0,
      shortTime: false,
      cancelText: 'Cancel',
      okText: 'OK'
    };

    this.meridien = 'AM';
    this.params = angular.extend(this.params, this.options);

    var picker = this;
    this.safeApply = function (fn) {
      var phase = $scope.$root.$$phase;
      if (phase !== '$apply' && phase !== '$digest') {
        return $scope.$apply(fn);
      }
    };
    $timeout(function () {
      console.log('Initializing display');
      picker.init();
    }, 200);
  };

  PluginController.prototype = {
    init: function () {
      this.$dtpElement = angular.element('md-dialog:visible');
      this.timeMode = this.params.time && !this.params.date;
      this.dateMode = this.params.date;
      this.initDates();
      this.start();
    },
    initDates: function () {
      var _dateParam = function (input, fallback) {
        var ret = null;
        if (angular.isDefined(input) && input !== null) {
          if (angular.isString(input)) {
            if (typeof(this.params.format) !== 'undefined' && this.params.format !== null) {
              ret = moment(input, this.params.format).locale(this.params.lang);
            }
            else {
              ret = moment(input).locale(this.params.lang);
            }
          }
          else {
            if (angular.isDate(input)) {
              var x = input.getTime();
              ret = moment(x, "x").locale(this.params.lang);
            } else if (input._isAMomentObject) {
              ret = input;
            }
          }
        }
        else {
          ret = fallback;
        }
        return ret;
      };

      this.currentDate = _dateParam(this.params.currentDate, moment());
      this.minDate = _dateParam(this.params.minDate);
      this.maxDate = _dateParam(this.params.maxDate);
      this.selectDate(this.currentDate);
    },
    initDate: function (d) {
      this.currentView = VIEW_STATES.DATE;
    },
    initHours: function () {
      this.currentView = VIEW_STATES.HOUR;

      if (!this.params.date) {
        var w = this.$dtpElement.find('.dtp-content').width();

        var mgLeft = this.$dtpElement.find('.dtp-picker-clock').css('marginLeft').replace('px', '');
        var mgRight = this.$dtpElement.find('.dtp-picker-clock').css('marginRight').replace('px', '');

        var pl = this.$dtpElement.find('.dtp-picker').css('paddingLeft').replace('px', '');
        var pr = this.$dtpElement.find('.dtp-picker').css('paddingRight').replace('px', '');

        this.$dtpElement.find('.dtp-picker-clock').innerWidth(w - (parseInt(mgLeft) + parseInt(mgRight) + parseInt(pl) + parseInt(pr)));
      }

      this.showTime(this.currentDate);

      this.$dtpElement.find('.dtp-picker-datetime').removeClass('hidden');
      this.$dtpElement.find('.dtp-picker-calendar').addClass('hidden');

      var pL = this.$dtpElement.find('.dtp-picker-clock').parent().parent().css('paddingLeft').replace('px', '');
      var pT = this.$dtpElement.find('.dtp-picker-clock').parent().parent().css('paddingTop').replace('px', '');
      var mL = this.$dtpElement.find('.dtp-picker-clock').css('marginLeft').replace('px', '');
      var mT = this.$dtpElement.find('.dtp-picker-clock').css('marginTop').replace('px', '');

      var radius = (this.$dtpElement.find('.dtp-picker-clock').innerWidth() / 2);
      var j = radius / 1.2;

      var hours = [];

      for (var h = 0; h < 12; ++h) {
        var x = j * Math.sin(Math.PI * 2 * (h / 12));
        var y = j * Math.cos(Math.PI * 2 * (h / 12));

        var hour = $('<div>', {class: 'dtp-picker-time'})
          .css
          ({
            marginLeft: (radius + x + parseInt(pL) / 2) - (parseInt(pL) + parseInt(mL)) + 'px',
            marginTop: (radius - y - parseInt(mT) / 2) - (parseInt(pT) + parseInt(mT)) + 'px'
          });
        var cH = ((this.currentDate.format('h') == 12) ? 0 : this.currentDate.format('h'));
        var hourLink = $('<a>', {
          href: 'javascript:void(0);',
          class: 'dtp-select-hour'
        }).data('hour', h).text((h == 0 ? 12 : h));
        if (h == parseInt(cH))
          hourLink.addClass('selected');

        hour.append(hourLink);
        hours.push(hour);
      }

      this.$dtpElement.find('a.dtp-select-hour').off('click');

      this.$dtpElement.find('.dtp-picker-clock').html(hours);
      this.toggleTime(true);

      this.$dtpElement.find('.dtp-picker-clock').css('height', (this.$dtpElement.find('.dtp-picker-clock').width()) + (parseInt(pT) + parseInt(mT)) + 'px');

      this.initHands(true);
    },
    initMinutes: function () {
      this.currentView = VIEW_STATES.MINUTE;

      this.showTime(this.currentDate);

      this.$dtpElement.find('.dtp-picker-calendar').addClass('hidden');
      this.$dtpElement.find('.dtp-picker-datetime').removeClass('hidden');

      var pL = this.$dtpElement.find('.dtp-picker-clock').parent().parent().css('paddingLeft').replace('px', '');
      var pT = this.$dtpElement.find('.dtp-picker-clock').parent().parent().css('paddingTop').replace('px', '');
      var mL = this.$dtpElement.find('.dtp-picker-clock').css('marginLeft').replace('px', '');
      var mT = this.$dtpElement.find('.dtp-picker-clock').css('marginTop').replace('px', '');

      var r = (this.$dtpElement.find('.dtp-picker-clock').innerWidth() / 2);
      var j = r / 1.2;

      var minutes = [];

      for (var m = 0; m < 60; m += 5) {
        var x = j * Math.sin(Math.PI * 2 * (m / 60));
        var y = j * Math.cos(Math.PI * 2 * (m / 60));

        var minute = $('<div>', {class: 'dtp-picker-time'})
          .css
          ({
            marginLeft: (r + x + parseInt(pL) / 2) - (parseInt(pL) + parseInt(mL)) + 'px',
            marginTop: (r - y - parseInt(mT) / 2) - (parseInt(pT) + parseInt(mT)) + 'px'
          });

        var minuteLink = $('<a>', {
          href: 'javascript:void(0);',
          class: 'dtp-select-minute'
        }).data('minute', m).text(((m.toString().length == 2) ? m : '0' + m));
        if (m == 5 * Math.round(this.currentDate.minute() / 5)) {
          minuteLink.addClass('selected');
          this.currentDate.minute(m);
        }

        minute.append(minuteLink);
        minutes.push(minute);
      }

      this.$dtpElement.find('a.dtp-select-minute').off('click');

      this.$dtpElement.find('.dtp-picker-clock').html(minutes);
      this.toggleTime(false);

      this.$dtpElement.find('.dtp-picker-clock').css('height', (this.$dtpElement.find('.dtp-picker-clock').width()) + (parseInt(pT) + parseInt(mT)) + 'px');

      this.initHands(false);

      this._centerBox();
    },
    initHands: function (t) {
      this.$dtpElement.find('.dtp-picker-clock').append
      (
        '<div class="dtp-hand dtp-hour-hand"></div>' +
        '<div class="dtp-hand dtp-minute-hand"></div>' +
        '<div class="dtp-clock-center"></div>'
      );

      var pL = this.$dtpElement.find('.dtp-picker-clock').parent().parent().css('paddingLeft').replace('px', '');
      var pT = this.$dtpElement.find('.dtp-picker-clock').parent().parent().css('paddingTop').replace('px', '');
      var mL = this.$dtpElement.find('.dtp-picker-clock').css('marginLeft').replace('px', '');
      var mT = this.$dtpElement.find('.dtp-picker-clock').css('marginTop').replace('px', '');

      var w = this.$dtpElement.find('.dtp-clock-center').width() / 2;
      var h = this.$dtpElement.find('.dtp-clock-center').height() / 2;

      var r = (this.$dtpElement.find('.dtp-picker-clock').innerWidth() / 2);
      var j = r / 1.2;

      var _hL = r / 1.7;
      var _mL = r / 1.5;

      this.$dtpElement.find('.dtp-hour-hand').css({
        left: r + (parseInt(mL) * 1.5) + 'px',
        height: _hL + 'px',
        marginTop: (r - _hL - parseInt(pL)) + 'px'
      }).addClass((t === true) ? 'on' : '');
      this.$dtpElement.find('.dtp-minute-hand').css
      ({
        left: r + (parseInt(mL) * 1.5) + 'px',
        height: _mL + 'px',
        marginTop: (r - _mL - parseInt(pL)) + 'px'
      }).addClass((t === false) ? 'on' : '');
      this.$dtpElement.find('.dtp-clock-center').css
      ({
        left: r + parseInt(pL) + parseInt(mL) - w + 'px',
        marginTop: (r - (parseInt(mL) / 2)) - h + 'px'
      });

      this.animateHands();

      this._centerBox();
    },
    animateHands: function () {
      var h = this.currentDate.hour();
      var m = this.currentDate.minute();

      this.rotateElement(this.$dtpElement.find('.dtp-hour-hand'), (360 / 12) * h);
      this.rotateElement(this.$dtpElement.find('.dtp-minute-hand'), ((360 / 60) * (5 * Math.round(this.currentDate.minute() / 5))));
    },
    isAfterMinDate: function (date, checkHour, checkMinute) {
      var _return = true;

      if (typeof(this.minDate) !== 'undefined' && this.minDate !== null) {
        var _minDate = moment(this.minDate);
        var _date = moment(date);

        if (!checkHour && !checkMinute) {
          _minDate.hour(0);
          _minDate.minute(0);

          _date.hour(0);
          _date.minute(0);
        }

        _minDate.second(0);
        _date.second(0);
        _minDate.millisecond(0);
        _date.millisecond(0);

        if (!checkMinute) {
          _date.minute(0);
          _minDate.minute(0);

          _return = (parseInt(_date.format("X")) >= parseInt(_minDate.format("X")));
        }
        else {
          _return = (parseInt(_date.format("X")) >= parseInt(_minDate.format("X")));
        }
      }

      return _return;
    },
    isBeforeMaxDate: function (date, checkTime, checkMinute) {
      var _return = true;

      if (typeof(this.maxDate) !== 'undefined' && this.maxDate !== null) {
        var _maxDate = moment(this.maxDate);
        var _date = moment(date);

        if (!checkTime && !checkMinute) {
          _maxDate.hour(0);
          _maxDate.minute(0);

          _date.hour(0);
          _date.minute(0);
        }

        _maxDate.second(0);
        _date.second(0);
        _maxDate.millisecond(0);
        _date.millisecond(0);

        if (!checkMinute) {
          _date.minute(0);
          _maxDate.minute(0);

          _return = (parseInt(_date.format("X")) <= parseInt(_maxDate.format("X")));
        }
        else {
          _return = (parseInt(_date.format("X")) <= parseInt(_maxDate.format("X")));
        }
      }

      return _return;
    },
    rotateElement: function (el, deg) {
      $(el).css
      ({
        WebkitTransform: 'rotate(' + deg + 'deg)',
        '-moz-transform': 'rotate(' + deg + 'deg)'
      });
    },
    showTime: function (date) {
      if (date) {
        var minutes = (5 * Math.round(date.minute() / 5));
        var content = ((this.params.shortTime) ? date.format('hh') : date.format('HH')) + ':' + ((minutes.toString().length == 2) ? minutes : '0' + minutes);

        if (this.params.date)
          this.$dtpElement.find('.dtp-actual-time').html(content);
        else {
          this.$dtpElement.find('.dtp-actual-maxtime').html(content);
        }
      }
    },
    selectDate: function (date) {
      if (date) {
        this.currentDate = date;
        if (!this.isAfterMinDate(this.currentDate)) {
          this.currentDate = moment(this.minDate);
        }

        if (!this.isBeforeMaxDate(this.currentDate)) {
          this.currentDate = moment(this.maxDate);
        }

        this.meridien = this.currentDate.hour() >= 12 ? 'PM' : 'AM';
      }
    },
    setName: function () {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return text;
    },
    isPM: function () {
      return this.meridien === 'PM';
    },
    setElementValue: function () {
      this.$element.trigger('beforeChange', this.currentDate);
      if (typeof($.material) !== 'undefined') {
        this.$element.removeClass('empty');
      }
      this.$element.val(moment(this.currentDate).locale(this.params.lang).format(this.params.format));
      this.$element.trigger('change', this.currentDate);
    },
    isPreviousMonthVisible: function () {
      return this.currentDate && this.isAfterMinDate(moment(this.currentDate).startOf('month'), false, false);
    },
    isNextMonthVisible: function () {
      return this.currentDate && this.isBeforeMaxDate(moment(this.currentDate).endOf('month'), false, false);
    },
    isPreviousYearVisible: function () {
      return this.currentDate && this.isAfterMinDate(moment(this.currentDate).startOf('year'), false, false);
    },
    isNextYearVisible: function () {
      return this.currentDate && this.isBeforeMaxDate(moment(this.currentDate).endOf('year'), false, false);
    },
    toggleTime: function (isHours) {
      if (isHours) {
        this.$dtpElement.find('a.dtp-select-hour').removeClass('disabled');
        this.$dtpElement.find('a.dtp-select-hour').removeProp('disabled');
        this.$dtpElement.find('a.dtp-select-hour').off('click');

        var _self = this;

        this.$dtpElement.find('a.dtp-select-hour').each(function () {
          var _hour = $(this).data('hour');

          var _date = moment(_self.currentDate);
          _date.hour(_self.convertHours(_hour)).minute(0).second(0);

          if (_self.isAfterMinDate(_date, true, false) === false || _self.isBeforeMaxDate(_date, true, false) === false) {
            $(this).prop("disabled");
            $(this).addClass("disabled");
          }
          else {
            $(this).on('click', _self._onSelectHour.bind(_self));
          }
        });
      }
      else {
        this.$dtpElement.find('a.dtp-select-minute').removeClass('disabled');
        this.$dtpElement.find('a.dtp-select-minute').removeProp('disabled');
        this.$dtpElement.find('a.dtp-select-minute').off('click');

        var _self = this;

        this.$dtpElement.find('a.dtp-select-minute').each(function () {
          var _minute = $(this).data('minute');

          var _date = moment(_self.currentDate);
          _date.minute(_minute).second(0);

          if (_self.isAfterMinDate(_date, true, true) === false || _self.isBeforeMaxDate(_date, true, true) === false) {
            $(this).prop("disabled");
            $(this).addClass("disabled");
          }
          else {
            $(this).on('click', _self._onSelectMinute.bind(_self));
          }
        });
      }
    },
    _attachEvent: function (el, ev, fn) {
      el.on(ev, fn);
      this._attachedEvents.push([el, ev, fn]);
    },
    _detachEvents: function () {
      for (var i = this._attachedEvents.length - 1; i >= 0; i--) {
        this._attachedEvents[i][0].off(this._attachedEvents[i][1], this._attachedEvents[i][2]);
        this._attachedEvents.splice(i, 1);
      }
    },
    start: function () {
      this.currentView = VIEW_STATES.DATE;
      this.$element.blur();
      //this.initDates();
      if (this.params.date) {
        this.initDate();
      } else {
        if (this.params.time) {
          this.initHours();
        }
      }
    },
    _onElementClick: function (e) {
      e.stopPropagation();
    },
    ok: function () {
      switch (this.currentView) {
        case VIEW_STATES.DATE:
          if (this.params.time === true) {
            this.initHours();
          }
          else {
            this.setElementValue();
            this.hide(true);
          }
          break;
        case VIEW_STATES.HOUR:
          this.initMinutes();
          break;
        case VIEW_STATES.MINUTE:
          this.setElementValue();
          this.hide(true);
          break;
      }
    },
    cancel: function () {
      if (this.params.time) {
        switch (this.currentView) {
          case VIEW_STATES.DATE:
            this.hide();
            break;
          case VIEW_STATES.HOUR:
            if (this.params.date) {
              this.initDate();
            }
            else {
              this.hide();
            }
            break;
          case VIEW_STATES.MINUTE:
            this.initHours();
            break;
        }
      }
      else {
        this.hide();
      }
    },
    selectMonthBefore: function () {
      this.selectDate(this.currentDate.subtract(1, 'months'));
    },
    selectMonthAfter: function () {
      this.selectDate(this.currentDate.add(1, 'months'));
    },
    selectYearBefore: function () {
      this.selectDate(this.currentDate.subtract(1, 'years'));
    },
    selectYearAfter: function () {
      this.selectDate(this.currentDate.add(1, 'years'));
    },
    _onSelectHour: function (e) {
      this.$dtpElement.find('a.dtp-select-hour').removeClass('selected');
      $(e.currentTarget).addClass('selected');

      var dataHour = parseInt($(e.currentTarget).data('hour'));
      if (this.isPM())
        dataHour += 12;

      this.currentDate.hour(dataHour);
      this.showTime(this.currentDate);

      this.animateHands();
    },
    _onSelectMinute: function (e) {
      this.$dtpElement.find('a.dtp-select-minute').removeClass('selected');
      $(e.currentTarget).addClass('selected');

      this.currentDate.minute(parseInt($(e.currentTarget).data('minute')));
      this.showTime(this.currentDate);

      this.animateHands();
    },
    selectAM: function () {
      if (this.currentDate.hour() >= 12) {
        if (this.currentDate.subtract(12, 'hours'))
          this.showTime(this.currentDate);
      }
      this.meridien = 'AM';
      this.toggleTime((this.currentView === VIEW_STATES.HOUR));
    },
    selectPM: function () {
      if (this.currentDate.hour() < 12) {
        if (this.currentDate.add(12, 'hours'))
          this.showTime(this.currentDate);
      }
      this.meridien = 'PM';
      this.toggleTime((this.currentView === VIEW_STATES.HOUR));
    },
    convertHours: function (h) {
      var _return = h;

      if ((h < 12) && this.isPM())
        _return += 12;

      return _return;
    },
    setDate: function (date) {
      this.params.currentDate = date;
      this.initDates();
    },
    setMinDate: function (date) {
      this.params.minDate = date;
      this.initDates();
    },
    setMaxDate: function (date) {
      this.params.maxDate = date;
      this.initDates();
    },
    destroy: function () {
      this._detachEvents();
      this.$dtpElement.remove();
    },
    hide: function (okBtn) {
      if (okBtn) {
        this._dialog.hide(this.currentDate);
      } else {
        this._dialog.cancel();
      }
    },
    resetDate: function () {

    },
    _centerBox: function () {
    }
  };


  angular.module(moduleName)
    .directive('mdcDatetimePickerCalendar', [
      function () {


        return {
          restrict: 'A',
          scope: {
            picker: '=',
            date: '='
          },
          bindToController: true,
          controllerAs: 'cal',
          controller: ['$scope',
            function ($scope) {
              var calendar = this,
                picker = this.picker,
                days = [];

              for (var i = picker.params.weekStart; days.length < 7; i++) {
                if (i > 6) {
                  i = 0;
                }
                days.push(i.toString());
              }


              var generateCalendar = function (date) {
                var _calendar = {};
                if (date !== null) {
                  var startOfMonth = moment(date).locale(picker.params.lang).startOf('month');
                  var endOfMonth = moment(date).locale(picker.params.lang).endOf('month');

                  var iNumDay = startOfMonth.format('d');

                  _calendar.week = days;
                  _calendar.days = [];

                  for (var i = startOfMonth.date(); i <= endOfMonth.date(); i++) {
                    if (i === startOfMonth.date()) {
                      var iWeek = _calendar.week.indexOf(iNumDay.toString());
                      if (iWeek > 0) {
                        for (var x = 0; x < iWeek; x++) {
                          _calendar.days.push(0);
                        }
                      }
                    }
                    _calendar.days.push(moment(startOfMonth).locale(picker.params.lang).date(i));
                  }

                  var daysInAWeek = 7, daysTmp = [], slices = Math.ceil(_calendar.days.length / daysInAWeek);
                  for (var j = 0; j < slices; j++) {
                    daysTmp.push(_calendar.days.slice(j * daysInAWeek, (j + 1) * daysInAWeek));
                  }
                  _calendar.days = daysTmp;
                  calendar._calendar = _calendar;
                }

              };

              calendar.toDay = function (i) {
                return moment(parseInt(i), "d")
                  .locale(picker.params.lang)
                  .format("dd")
                  .substring(0, 1);
              };

              calendar.isInRange = function (date) {
                return picker.isAfterMinDate(moment(date), false, false)
                  && picker.isBeforeMaxDate(moment(date), false, false);
              };

              generateCalendar(calendar.date);

              $scope.$watch(function () {
                return calendar.date ? calendar.date.format('MMMMYYYY') : false;
              }, function () {
                if (calendar.date) {
                  generateCalendar(calendar.date);
                }
              });

            }
          ],
          template: '<div class="dtp-picker-month">{{cal.date.format("MMMM YYYY")}}</div>'
          + '<table class="table dtp-picker-days">'
          + '    <thead>'
          + '    <tr>'
          + '        <th ng-repeat="day in cal._calendar.week">{{cal.toDay(day)}}</th>'
          + '    </tr>'
          + '    </thead>'
          + '    <tbody>'
          + '    <tr ng-repeat="weekDays in cal._calendar.days">'
          + '        <td data-date="{{weekDate ? weekDate.format(\'D\') : weekDate}}" ng-repeat="weekDate in weekDays track by $index">'
          + '             <a href="#" ng-click="cal.picker.selectDate(weekDate)" ng-dblclick="cal.picker.selectDate(weekDate);cal.picker.ok();" class="dtp-select-day" ng-class="{selected: weekDate.format(\'DD\')===cal.date.format(\'DD\')}" ng-if="weekDate && cal.isInRange(weekDate)">{{weekDate.format(\'DD\')}}</a>'
          + '             <span class="dtp-select-day" ng-if="weekDate && !cal.isInRange(weekDate)">{{weekDate.format(\'DD\')}}</span>'
          + '        </td>'
          + '    </tr>'
          + '    </tbody>'
          + '</table>',
          link: function (scope, element, attrs) {
          }
        };
      }])
  ;
})(moment, jQuery);
