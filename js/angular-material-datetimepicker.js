(function (moment) {
  'use strict';
  var moduleName = "ngMaterialDatePicker";

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
    + '            </div>'//start time
    + '            <div class="dtp-time" ng-show="picker.params.time && !picker.params.date">'
    + '                <div class="dtp-actual-maxtime">{{picker.currentNearest5Minute().format(picker.params.shortTime ? "hh:mm" : "HH:mm")}}</div>'
    + '            </div>'
    + '            <div class="dtp-picker">'
    + '                <div mdc-datetime-picker-calendar date="picker.currentDate" picker="picker"' +
    ' class="dtp-picker-calendar"' +
    ' ng-show="picker.currentView ===' +
    ' picker.VIEWS.DATE"></div>'
    + '                <div class="dtp-picker-datetime" ng-show="picker.currentView !== picker.VIEWS.DATE">'
    + '                    <div class="dtp-actual-meridien">'
    + '                        <div class="left p20">'
    + '                            <a href="#" class="dtp-meridien-am" ng-class="{selected: picker.meridien == \'AM\'}" ng-click="picker.selectAM()">AM</a>'
    + '                        </div>'
    + '                        <div ng-show="!picker.timeMode" class="dtp-actual-time p60">{{picker.currentNearest5Minute().format(picker.params.shortTime ? "hh:mm" : "HH:mm")}}</div>'
    + '                        <div class="right p20">'
    + '                            <a href="#" class="dtp-meridien-pm" ng-class="{selected: picker.meridien == \'PM\'}" ng-click="picker.selectPM()">PM</a>'
    + '                        </div>'
    + '                        <div class="clearfix"></div>'
    + '                    </div>'
    + '                    <mdc-datetime-picker-clock mode="hours" ng-if="picker.currentView === picker.VIEWS.HOUR"></mdc-datetime-picker-clock>'
    + '                    <mdc-datetime-picker-clock mode="minutes" ng-if="picker.currentView === picker.VIEWS.MINUTE"></mdc-datetime-picker-clock>'
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
          require: 'ngModel',
          scope: {
            currentDate: '=ngModel',
            time: '=',
            date: '=',
            minDate: '=',
            maxDate: '=',
            shortTime: '=',
            format: '@',
            cancelText: '@',
            okText: '@'
          },
          link: function (scope, element, attrs, ngModel) {
            if (!scope.format) {
              if (scope.date && scope.time) {
                scope.format = 'YYYY-MM-DD HH:mm:ss';
              } else if (scope.date) {
                scope.format = 'YYYY-MM-DD';
              } else {
                scope.format = 'HH:mm';
              }
            }

            if (angular.isString(scope.currentDate) && scope.currentDate !== '') {
              scope.currentDate = moment(scope.currentDate, scope.format);
            }

            if (ngModel) {
              ngModel.$formatters.push(function (value) {
                return moment(value).format(scope.format);
              });
            }

            //@TODO custom event to trigger input
            element.on('focus', function (e) {
              console.log('FOcused');
              var options = {};
              for (var i in attrs) {
                if (scope.hasOwnProperty(i) && !angular.isUndefined(scope[i])) {
                  options[i] = scope[i];
                }
              }
              options.currentDate = scope.currentDate;
              var locals = {element: element, options: options};
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
                  scope.currentDate = v ? v._d : v;
                  //scope.currentDate = v;
                })
              ;
            });
          }
        };
      }])
  ;

  var PluginController = function ($scope, $mdDialog) {
    this.currentView = VIEW_STATES.DATE;
    this._dialog = $mdDialog;

    this.minDate;
    this.maxDate;

    this._attachedEvents = [];

    this.$element = angular.element(this.element);
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
    this.init();
  };

  PluginController.prototype = {
    init: function () {
      this.timeMode = this.params.time && !this.params.date;
      this.dateMode = this.params.date;
      this.initDates();
      this.start();
    },
    currentNearest5Minute: function () {
      var date = this.currentDate || moment();
      var minutes = (5 * Math.round(date.minute() / 5));
      if (minutes >= 60) {
        minutes = 55; //always push down
      }
      return moment(date).minutes(minutes);
    },
    initDates: function () {
      var that = this;
      var _dateParam = function (input, fallback) {
        var ret = null;
        if (angular.isDefined(input) && input !== null && input !== '') {
          if (angular.isString(input)) {
            if (typeof(that.params.format) !== 'undefined' && that.params.format !== null) {
              ret = moment(input, that.params.format).locale(that.params.lang);
            }
            else {
              ret = moment(input).locale(that.params.lang);
            }
          }
          else {
            if (angular.isDate(input)) {
              var x = input.getTime();
              ret = moment(x, "x").locale(that.params.lang);
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
    },
    initMinutes: function () {
      this.currentView = VIEW_STATES.MINUTE;
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
    selectDate: function (date) {
      if (date) {
        this.currentDate = moment(date);
        if (!this.isAfterMinDate(this.currentDate)) {
          this.currentDate = moment(this.minDate);
        }

        if (!this.isBeforeMaxDate(this.currentDate)) {
          this.currentDate = moment(this.maxDate);
        }
        this.currentDate.locale(this.params.lang);
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
    isHourAvailable: function (hour) {
      var _date = moment(this.currentDate);
      _date.hour(this.convertHours(hour)).minute(0).second(0);
      return this.isAfterMinDate(_date, true, false) && this.isBeforeMaxDate(_date, true, false);
    },
    isMinuteAvailable: function (minute) {
      var _date = moment(this.currentDate);
      _date.minute(minute).second(0);
      return this.isAfterMinDate(_date, true, true) && this.isBeforeMaxDate(_date, true, true);
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
            this.hide(true);
          }
          break;
        case VIEW_STATES.HOUR:
          this.initMinutes();
          break;
        case VIEW_STATES.MINUTE:
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
    selectAM: function () {
      if (this.currentDate.hour() >= 12) {
        this.selectDate(this.currentDate.subtract(12, 'hours'));
      }
    },
    selectPM: function () {
      if (this.currentDate.hour() < 12) {
        this.selectDate(this.currentDate.add(12, 'hours'));
      }
    },
    convertHours: function (h) {
      var _return = h;
      if ((h < 12) && this.isPM())
        _return += 12;

      return _return;
    },
    hide: function (okBtn) {
      if (okBtn) {
        this._dialog.hide(this.currentDate);
      } else {
        this._dialog.cancel();
      }
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
                  var startOfMonth = moment(date).locale(picker.params.lang).startOf('month')
                    .hour(date.hour())
                    .minute(date.minute())
                    ;
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

  angular.module(moduleName)
    .directive('mdcDatetimePickerClock', ['$timeout',
      function ($timeout) {

        var template = '<div class="dtp-picker-clock"><span ng-if="!points || points.length < 1">&nbsp;</span>'
          + '<div ng-repeat="point in points" class="dtp-picker-time" style="margin-left: {{point.left}}px; margin-top: {{point.top}}px;">'
          + '   <a href="#" ng-class="{selected: point.value===currentValue}" class="dtp-select-hour" ng-click="setTime(point.value)" ng-dblclick="setTime(point.value);picker.ok();" ng-if="pointAvailable(point)">{{point.display}}</a>'
          + '   <a href="#" class="disabled dtp-select-hour" ng-if="!pointAvailable(point)">{{point.display}}</a>'
          + '</div>'
          + '<div class="dtp-hand dtp-hour-hand"></div>'
          + '<div class="dtp-hand dtp-minute-hand"></div>'
          + '<div class="dtp-clock-center"></div>'
          + '</div>';

        return {
          restrict: 'E',
          template: template,
          link: function (scope, element, attrs) {
            var minuteMode = attrs.mode === 'minutes';
            var picker = scope.picker;
            //banking on the fact that there will only be one at a time
            var componentRoot = angular.element('md-dialog.dtp');
            var exec = function () {
              var clock = element.find('.dtp-picker-clock'), pickerEl = componentRoot.find('.dtp-picker');
              var w = componentRoot.find('.dtp-content').width();
              var pl = pickerEl.css('paddingLeft').replace('px', '');
              var pr = pickerEl.css('paddingRight').replace('px', '');
              var ml = element.find('.dtp-picker-clock').css('marginLeft').replace('px', '');
              var mr = element.find('.dtp-picker-clock').css('marginRight').replace('px', '');
              //set width
              clock.innerWidth(w - (parseInt(ml) + parseInt(mr) + parseInt(pl) + parseInt(pr)));
              var pL = parseInt(pickerEl.css('paddingLeft').replace('px', ''));
              var pT = parseInt(pickerEl.css('paddingTop').replace('px', ''));
              var mL = parseInt(clock.css('marginLeft').replace('px', ''));
              var mT = parseInt(clock.css('marginTop').replace('px', ''));

              var r = (clock.innerWidth() / 2);
              var j = r / 1.2; //???

              var points = [];

              for (var h = 0; h < 12; ++h) {
                var x = j * Math.sin(Math.PI * 2 * (h / 12));
                var y = j * Math.cos(Math.PI * 2 * (h / 12));

                var hour = {
                  left: (r + x + pL / 2) - (pL + mL),
                  top: (r - y - mT / 2) - (pT + mT),
                  value: (minuteMode ? (h * 5) : h) //5 for minute 60/12
                };

                if (minuteMode) {
                  hour.display = hour.value < 10 ? ('0' + hour.value) : hour.value;
                } else {
                  hour.display = (h === 0) ? 12 : h;
                }

                points.push(hour);
              }

              scope.points = points;
              setCurrentValue();
              clock.css('height', (clock.width()) + (parseInt(pT) + parseInt(mT)) + 'px');
              //picker.initHands(true);

              var centerWidth = element.find('.dtp-clock-center').width() / 2;
              var centerHeight = element.find('.dtp-clock-center').height() / 2;
              var _hL = r / 1.7;
              var _mL = r / 1.5;

              element.find('.dtp-hour-hand').css({
                left: r + (mL * 1.5) + 'px',
                height: _hL + 'px',
                marginTop: (r - _hL - pL) + 'px'
              }).addClass(!minuteMode ? 'on' : '');

              element.find('.dtp-minute-hand').css
              ({
                left: r + (mL * 1.5) + 'px',
                height: _mL + 'px',
                marginTop: (r - _mL - pL) + 'px'
              }).addClass(minuteMode ? 'on' : '');

              element.find('.dtp-clock-center').css({
                left: (r + pL + mL - centerWidth) + 'px',
                marginTop: (r - (mL / 2)) - centerHeight + 'px'
              });
              animateHands();
            };

            var animateHands = function () {
              var _date = picker.currentNearest5Minute();
              var h = _date.hour();
              var m = _date.minute();

              rotateElement(element.find('.dtp-hour-hand'), (360 / 12) * h);
              rotateElement(element.find('.dtp-minute-hand'), ((360 / 60) * (5 * Math.round(m / 5))));
            };

            var rotateElement = function (el, deg) {
              angular.element(el).css({
                WebkitTransform: 'rotate(' + deg + 'deg)',
                '-moz-transform': 'rotate(' + deg + 'deg)'
              });
            };


            var setCurrentValue = function () {
              var date = picker.currentNearest5Minute();
              scope.currentValue = minuteMode ? date.minute() : (date.hour() % 12);
            };

            scope.$watch(function () {
              var tmp = picker.currentNearest5Minute();
              return tmp ? tmp.format('HH:mm') : '';
            }, function (newVal) {
              setCurrentValue();
              animateHands();
            });

            scope.setTime = function (val) {
              if (!minuteMode) {
                picker.currentDate.hour(picker.isPM() ? (val + 12) : val);
              } else {
                picker.currentDate.minute(val);
              }
              picker.currentDate.second(0)
            };

            scope.pointAvailable = function (point) {
              return minuteMode ? picker.isMinuteAvailable(point.value) : picker.isHourAvailable(point.value);
            };

            var unwatcher = scope.$watch(function () {
              return element.find('div').length;
            }, function () {
              exec();
              unwatcher();
            });
          }
        }
      }])
  ;
})(moment);
