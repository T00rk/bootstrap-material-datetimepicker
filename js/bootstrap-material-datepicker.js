(function($, moment)
{
	var pluginName = "bootstrapMaterialDatePicker";
  	var pluginDataName = "plugin_" + pluginName;

	function Plugin(element, options)
	{
		this.element = element;
		this.$element = $(element);

		this.params = { date : true, time : false, format : 'YYYY-MM-DD', minDate : null, maxDate : null, currentDate : null, lang : 'en', weekStart : 1, linghTimeFormat : false };
		this.params = $.fn.extend(this.params, options);

		this.init();
	}

	$.fn[pluginName] = function(options, p)
	{
		this.each(function()
		{
			if(!$.data(this, pluginDataName))
			{
				$.data(this, pluginDataName, new Plugin(this, options));
			}
			else
			{
				if(typeof($.data(this, pluginDataName)[options]) === 'function')
				{
					$.data(this, pluginDataName)[options](p);
				}
				if(options === 'destroy')
				{
					delete $.data(this, pluginDataName);
				}
			}
		});
		return this;
	};

	Plugin.prototype = 
	{
		_attachedEvents : [],

		init: function()
		{
			this.initDates();

			this.name = "dtp_" + this.setName();
			this.$element.attr("data-dtp", this.name);

			this.days = [];
			for(var i = this.params.weekStart; this.days.length < 7; i++)
			{
				if(i > 6)
				{
					i = 0;
				}
				this.days.push(i.toString());
			}

			this.initTemplate();
			this.initButtons();

			this._attachEvent(this.$element, 'click', function(){ this.onClick(); }.bind(this));
		},
		initDates: function()
		{
			if(typeof(this.params.currentDate) !== 'undefined' && this.params.currentDate !== null)
			{
				if(typeof(this.params.currentDate) === 'string')
				{
					if(typeof(this.params.format) !== 'undefined' && this.params.format !== null)
					{
						this.params.currentDate = moment(this.params.currentDate, this.params.format).locale(this.params.lang);
					}
					else
					{
						this.params.currentDate = moment(this.params.currentDate).locale(this.params.lang);
					}
				}
				else
				{
					if(typeof(this.params.currentDate.isValid) === 'undefined' || typeof(this.params.currentDate.isValid) !== 'function')
					{
						var x = this.params.currentDate.getTime();
						this.params.currentDate = moment(x, "x").locale(this.params.lang);
					}
				}
				this.$element.val(this.params.currentDate.format(this.params.format));
			}

			if(typeof(this.params.minDate) !== 'undefined' && this.params.minDate !== null)
			{
				if(typeof(this.params.minDate) === 'string')
				{
					if(typeof(this.params.format) !== 'undefined' && this.params.format !== null)
					{
						this.params.minDate = moment(this.params.minDate, this.params.format).locale(this.params.lang);
					}
					else
					{
						this.params.minDate = moment(this.params.minDate).locale(this.params.lang);
					}
				}
				else
				{
					if(typeof(this.params.minDate.isValid) === 'undefined' || typeof(this.params.minDate.isValid) !== 'function')
					{
						var x = this.params.minDate.getTime();
						this.params.minDate = moment(x, "x").locale(this.params.lang);
					}
				}
			}

			if(typeof(this.params.maxDate) !== 'undefined' && this.params.maxDate !== null)
			{
				if(typeof(this.params.maxDate) === 'string')
				{
					if(typeof(this.params.format) !== 'undefined' && this.params.format !== null)
					{
						this.params.maxDate = moment(this.params.maxDate, this.params.format).locale(this.params.lang);
					}
					else
					{
						this.params.maxDate = moment(this.params.maxDate).locale(this.params.lang);
					}
				}
				else
				{
					if(typeof(this.params.maxDate.isValid) === 'undefined' || typeof(this.params.maxDate.isValid) !== 'function')
					{
						var x = this.params.maxDate.getTime();
						this.params.maxDate = moment(x, "x").locale(this.params.lang);
					}
				}
			}
		},
		initTemplate: function()
		{
			this.template = '<div class="modal dtp fade" id="' + this.name + '" tabindex="-1" role="dialog" aria-hidden="true">' +
							    '<div class="modal-dialog modal-no-radius">' +
							        '<div class="modal-content">' +
							            '<div class="modal-body">' +
							                '<div class="dtp-date-view">' +
							                    '<header class="dtp-header">' +
							                        '<div class="dtp-actual-day">Lundi</div>' +
							                    '</header>' +
							                    '<div class="dtp-date">' +
							                    	'<div class="row">' +
							                    		'<div class="col-sm-2 col-xs-2">' +
							                    			'<a href="javascript:void(0);" class="dtp-select-month-before"><span class="mdi-navigation-chevron-left"></span></a>' +
							                        	'</div>' +							                        	
							                        	'<div class="col-sm-8 col-xs-8 dtp-actual-month">MAR</div>' +
							                        	'<div class="col-sm-2 col-xs-2">' +
								                        	'<a href="javascript:void(0);" class="dtp-select-month-after"><span class="mdi-navigation-chevron-right"></span></a>' +
								                        '</div>' +
								                    '</div>' +
							                        '<div class="dtp-actual-num">13</div>' +
							                        '<div class="row">' +
							                    		'<div class="col-sm-2 col-xs-2">' +
							                    			'<a href="javascript:void(0);" class="dtp-select-year-before"><span class="mdi-navigation-chevron-left"></span></a>' +
							                        	'</div>' +							                        	
							                        	'<div class="col-sm-8 col-xs-8 dtp-actual-year">2014</div>' +
							                        	'<div class="col-sm-2 col-xs-2">' +
								                        	'<a href="javascript:void(0);" class="dtp-select-year-after"><span class="mdi-navigation-chevron-right"></span></a>' +
								                        '</div>' +
								                    '</div>' +
							                    '</div>' +
							                    '<div class="dtp-picker">' +
							                        '<div class="dtp-picker-month">Mars 2015</div>' +
							                        '<div class="dtp-picker-calendar"></div>' +
							                    '</div>' +
							                    '<div class="dtp-buttons">' +
							                        '<button class="dtp-btn-ok pull-right btn btn-flat">OK</button>' +
							                        '<button class="dtp-btn-cancel pull-right btn btn-flat">ANNULER</button>' +
							                        '<div class="clearfix"></div>' +
							                    '</div>' +
							                '</div>' +
							            '</div>' +
							        '</div>' +
							    '</div>' +
							'</div>';

			if($('body').find("#" + this.name).length <= 0)
			{
				$('body').append(this.template);

				this.dtpElement = $('body').find("#" + this.name);
				this.$dtpElement = $(this.dtpElement);
			}
		},
		initButtons: function()
		{
			this._attachEvent(this.$dtpElement.find('.dtp-btn-cancel'), 'click', function()
			{
				this.onCancelClick();
			}.bind(this));
			this._attachEvent(this.$dtpElement.find('.dtp-btn-ok'), 'click', function()
			{
				this.onOkClick();
			}.bind(this));
			this._attachEvent(this.$dtpElement.find('a.dtp-select-month-before'), 'click', function()
			{
				this.onMonthBeforeClick();
			}.bind(this));
			this._attachEvent(this.$dtpElement.find('a.dtp-select-month-after'), 'click', function()
			{
				this.onMonthAfterClick();
			}.bind(this));
			this._attachEvent(this.$dtpElement.find('a.dtp-select-year-before'), 'click', function()
			{
				this.onYearBeforeClick();
			}.bind(this));
			this._attachEvent(this.$dtpElement.find('a.dtp-select-year-after'), 'click', function()
			{
				this.onYearAfterClick();
			}.bind(this));
		},
		initDate: function(d)
		{
			var _date = ((typeof(d) !== 'undefined' && d !== null) ? d : null);

			if(_date === null)
			{
				if(this.$element.val().length > 0)
				{
					_date = moment(this.$element.val(), this.params.format).locale(this.params.lang);
				}
				else
				{
					if (typeof(this.params.currentDate) !== 'undefined' && this.params.currentDate !== null)
					{
						_date = moment(this.params.currentDate, this.params.format).locale(this.params.lang);
					}
					else
					{
						_date = moment().locale(this.params.lang);
					}
				}

				if(!_date.isValid())
				{
					_date = moment().locale(this.params.lang);
				}
			}

			this.showDate(_date);
			this.$dtpElement.find('.dtp-picker-month').html(_date.format('MMMM YYYY'));

			var _calendar = this.generateCalendar(_date);

			var _template = "";
			if(typeof(_calendar.week) !== 'undefined' && typeof(_calendar.days) !== 'undefined')
			{
				_template += '<table class="table dtp-picker-days"><thead>';
				for(var i = 0; i < _calendar.week.length; i++)
				{
					_template += '<th>' + moment(parseInt(_calendar.week[i]), "d").locale(this.params.lang).format("dd").substring(0, 1) + '</th>';
				}
				_template += '</thead>';
				_template += '<tbody><tr>';
				for(var i = 0; i < _calendar.days.length; i++)
				{
					if(i % 7 == 0)
						_template += '</tr><tr>';
					_template += '<td data-date="' + moment(_calendar.days[i]).locale(this.params.lang).format("X") + '">';
					if(_calendar.days[i] != 0)
					{
						if((typeof(this.params.minDate) !== 'undefined' && this.params.minDate !== null && moment(_calendar.days[i]).locale(this.params.lang).isBefore(moment(this.params.minDate).locale(this.params.lang))) || 
						   (typeof(this.params.maxDate) !== 'undefined' && this.params.maxDate !== null) && moment(_calendar.days[i]).locale(this.params.lang).isAfter(moment(this.params.maxDate).locale(this.params.lang)))
						{
							_template += '<span class="dtp-select-day">' + moment(_calendar.days[i]).locale(this.params.lang).format("DD") + '</span>';
						}
						else
						{
							if(moment(_calendar.days[i]).locale(this.params.lang).format("DD") === moment(_date).locale(this.params.lang).format("DD"))
							{
								_template += '<a href="javascript:void(0);" class="dtp-select-day selected">' + moment(_calendar.days[i]).locale(this.params.lang).format("DD") + '</a>';
							}
							else
							{
								_template += '<a href="javascript:void(0);" class="dtp-select-day">' + moment(_calendar.days[i]).locale(this.params.lang).format("DD") + '</a>';
							}
						}						

						_template += '</td>';
					}
				}
				_template += '</tr></tbody></table>';

				this.$dtpElement.find('a.dtp-select-day').off('click');				
				this.$dtpElement.find('.dtp-picker-calendar').html(_template);

				if(typeof($.material) !== 'undefined')
				{
					$.material.init();
				}
				this.$dtpElement.find('a.dtp-select-day').on('click', function(e)
				{
					this.onSelect(e);
				}.bind(this));

				this.toggleButtons(_date);
			}
		},
		constructDateFromHtml: function()
		{
			var _date = null;

			var el = this.$dtpElement.find('a.dtp-select-day.selected');
			if(el && el.length > 0)
			{
				_date = moment(el.parent().data('date'), 'X').locale(this.params.lang);
			}
			else
			{
				_date = moment().locale(this.params.lang);
			}

			return _date;
		},
		selectDate: function(date)
		{
			if(date)
			{
				var _date = moment(date, "X").locale(this.params.lang);
				this.showDate(_date);
				this.$element.trigger('dateSelected', _date);
			}
		},
		showDate: function(date)
		{
			if(date)
			{
				this.$dtpElement.find('.dtp-actual-day').html(date.format('dddd'));
				this.$dtpElement.find('.dtp-actual-month').html(date.format('MMM').toUpperCase());
				this.$dtpElement.find('.dtp-actual-num').html(date.format('DD'));
				this.$dtpElement.find('.dtp-actual-year').html(date.format('YYYY'));
			}
		},
		generateCalendar: function(date)
		{
			var _calendar = {};

			if(date !== null)
			{
				var startOfMonth = moment(date).locale(this.params.lang).startOf('month');
				var endOfMonth = moment(date).locale(this.params.lang).endOf('month');

				var iNumDay = startOfMonth.format('d');

				_calendar.week = this.days;
				_calendar.days = [];

				for(var i = startOfMonth.format('D'); i <= endOfMonth.format('D'); i++)
				{
					if(i === startOfMonth.format('D'))
					{
						var iWeek = _calendar.week.indexOf(iNumDay.toString());
						if(iWeek > 0)
						{
							for(var x = 0; x < iWeek; x++)
							{
								_calendar.days.push(0);
							}
						}
					}
					_calendar.days.push(moment(startOfMonth).locale(this.params.lang).date(i));				
				}
			}

			return _calendar;
		},
		toggleButtons: function(date)
		{
			if(date && date.isValid())
			{
				var startOfMonth = moment(date).locale(this.params.lang).startOf('month');
				var endOfMonth = moment(date).locale(this.params.lang).endOf('month');

				if(typeof(this.params.minDate) !== 'undefined' && this.params.minDate !== null && moment(this.params.minDate).isAfter(startOfMonth))
				{
					this.$dtpElement.find('a.dtp-select-month-before').addClass('hidden');
					this.$dtpElement.find('a.dtp-select-year-before').addClass('hidden');
				}
				else
				{
					this.$dtpElement.find('a.dtp-select-month-before').removeClass('hidden');
					this.$dtpElement.find('a.dtp-select-year-before').removeClass('hidden');
				}

				if(typeof(this.params.maxDate) !== 'undefined' && this.params.maxDate !== null && moment(this.params.maxDate).isBefore(endOfMonth))
				{
					this.$dtpElement.find('a.dtp-select-month-after').addClass('hidden');
					this.$dtpElement.find('a.dtp-select-year-after').addClass('hidden');
				}
				else
				{
					this.$dtpElement.find('a.dtp-select-month-after').removeClass('hidden');
					this.$dtpElement.find('a.dtp-select-year-after').removeClass('hidden');
				}
			}
		},
		_attachEvent: function(el, ev, fn)
		{
			el.on(ev, fn);
			this._attachedEvents.push([el, ev, fn]);
		},
		_detachEvents: function()
		{
			for(var i = this._attachedEvents.length - 1; i >= 0; i--)
			{
				this._attachedEvents[i][0].off(this._attachedEvents[i][1], this._attachedEvents[i][2]);
				this._attachedEvents.splice(i,1);
			}
		},
		destroy: function()
		{
			this._detachEvents();
			this.$dtpElement.remove();
		},
		setName: function()
		{
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    		for( var i=0; i < 5; i++ )
    		{
        		text += possible.charAt(Math.floor(Math.random() * possible.length));
    		}

    		return text;
		},
		onClick: function()
		{
			this.initDate();
			$('#' + this.name).modal('show');
		},
		onOkClick: function()
		{
			var date = this.constructDateFromHtml();
			if(date != null)
			{
				this.currentDate = date;
				this.$element.trigger('beforeChange', this.currentDate);
				if(typeof($.material) !== 'undefined')
				{
					this.$element.removeClass('empty');
				}
				this.$element.val(moment(this.currentDate).format(this.params.format));
				this.$element.trigger('change', this.currentDate);

				$('#' + this.name).modal('hide');
			}
		},
		onCancelClick: function()
		{
			$('#' + this.name).modal('hide');
		},
		onMonthBeforeClick: function()
		{
			var date = this.constructDateFromHtml();
			if(date.isValid())
			{
				this.currentDate = moment(date).locale(this.params.lang).subtract(1, 'months');
				this.initDate(this.currentDate);
			}
		},
		onMonthAfterClick: function()
		{
			var date = this.constructDateFromHtml();
			if(date.isValid())
			{
				this.currentDate = moment(date).locale(this.params.lang).add(1, 'months');
				this.initDate(this.currentDate);
			}
		},
		onYearBeforeClick: function()
		{
			var date = this.constructDateFromHtml();
			if(date.isValid())
			{
				this.currentDate = moment(date).locale(this.params.lang).subtract(1, 'years');
				this.initDate(this.currentDate);
			}
		},
		onYearAfterClick: function()
		{
			var date = this.constructDateFromHtml();
			if(date.isValid())
			{
				this.currentDate = moment(date).locale(this.params.lang).add(1, 'years');
				this.initDate(this.currentDate);
			}
		},
		onSelect: function(e)
		{
			this.$dtpElement.find('a.dtp-select-day').removeClass('selected');
			$(e.currentTarget).addClass('selected');

			this.selectDate($(e.currentTarget).parent().data("date"));
		},
		setDate: function(date)
		{
			this.params.currentDate = date;
			this.initDates();
		},
		setMinDate: function(date)
		{
			this.params.minDate = date;
			this.initDates();
		},		
		setMaxDate: function(date)
		{
			this.params.maxDate = date;
			this.initDates();
		}
	};
})(jQuery, moment);
