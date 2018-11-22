# bootstrap-material-datetimepicker
Material DateTimePicker

Below are the screens for Bootstrap 4 and Bootstrap 4 with Daemonite material UI

![Bootstrap 4 material datetimepicker](/images/calendar-bs4.png?raw=true "Material design datetimepicker for Bootstrap 4")
![Bootstrap 4 material datetimepicker](/images/year-bs4.png?raw=true "Year picker")
![Bootstrap 4 material datetimepicker](/images/time-bs4.png?raw=true "Time picker")
![Bootstrap 4 material datetimepicker with Daemonite material UI](/images/calendar-daemonite.png?raw=true "Material design datetimepicker for Bootstrap 4 Daemonite with material UI")

<p>Originaly designed for Bootstrap Material, the V2.0 is now completely standalone and responsive.</p>
<p>In the css and js folder, you'll find a different version of the files for Bootstrap 4 -ending with -bs4).<br>
Regular version is built for Bootstrap 3.</p>

### Updates

| Date				| Author			| Description											 |
| ----------------- | ----------------- | ------------------------------------------------------ |
| 2018-11-22		| djibe				| Removed top right close icon, minor visual enhencements
| 2018-11-20		| djibe				| Fixed bug reported by edelCustodio (Issue 212 on T00rk page)
| 2018-08-02		| djibe				| unified code for all Bootstrap 4 themes (Vanilla, Daemonite material UI, MDBootstrap) + huge work on enhenced material look
| 2018-07-19		| djibe				| Minor enhencements
| 2018-07-06		| djibe				| Fixed year when disabled, fixed color when hovering a day, added animation when picker is opening
| 2018-05-25		| djibe				| Bug fixes for Bootstrap 4
| 2018-05-14		| djibe				| Bootstrap 4 compatibility, universal theming with CSS variables
| 2016-04-08		| donovansolms		| Disable specific days (#60 and #97)				 	 |
| 2016-04-08		| T00rk				| Fixed #85	 								 	 		 |
| 2016-04-08		| FoxyCorndog		| Fix PM overwrite bug	 					 	 		 |
| 2016-02-17		| T00rk				| Changed Clock to SVG	 					 	 		 |
| 2016-02-04		| T00rk				| Added a "Now" button (#38)	 					 	 |
| 2016-01-30		| T00rk				| Switch view on click (#39, #47)	 					 |
| 2016-01-29		| T00rk				| Added "clear button" (#48)		 					 |
| 2016-01-29		| T00rk				| Replace rem by em (#26)			 					 |
| 2016-01-29		| T00rk				| Display 24H clock (#54)			 					 |
| 2016-01-29		| T00rk				| Close on "ESC" (#52)			 					 	 |
| 2015-10-19		| drblue 			| Fixed erroneous package.json-file 					 |
| 2015-10-19		| Perdona			| Fix auto resize when month has 6 weeks				 |
| 2015-07-01		| T00rk 			| Redesigned element without using modal				 |
| 2015-06-16		| T00rk 			| Use Timepicker alone / Display short time (12 hours)	 |
| 2015-06-13		| T00rk 			| Fixed issue with HTML value tag 						 |
| 2015-05-25		| T00rk 			| Changed repo name to bootstrap-material-datetimepicker * |
| 2015-05-12		| T00rk				| Added parameters for button text						 |
| 2015-05-05		| Sovanna			| FIX undefined _minDate in isBeforeMaxDate func		 |
| 2015-04-10		| T00rk				| Little change in clock design							 |
| 2015-04-10		| Peterzen			| Added bower and requirejs support						 |
| 2015-04-08		| T00rk				| Fixed problem on locale switch						 |
| 2015-03-04		| T00rk				| Added Time picker										 |
(\*) File names have been changed

bootstrap-material-datepicker.js => bootstrap-material-date**time**picker.js

bootstrap-material-datepicker.css => bootstrap-material-date**time**picker.css

### Prerequisites

jquery [http://jquery.com/download/](http://jquery.com/download/)

momentjs [http://momentjs.com/](http://momentjs.com/)

Google Material Icon Font `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`


### Live Example

Bootstrap 3 : [Live example](http://t00rk.github.io/bootstrap-material-datetimepicker/)

Bootstrap 4 : [Live example](https://jsfiddle.net/djibe89/qfkjg3qh/)

Bootstrap 4 with Daemonite material UI : [Live example](https://jsfiddle.net/djibe89/t5sqqw8L/)

### Usage

	$('input').bootstrapMaterialDatePicker();

### bower

	bower install bootstrap-material-datetimepicker

### Parameters

| Name				| Type							| Description									|
| ----------------- | ----------------------------- | --------------------------------------------- |
| **format**		| String						| MomentJS Format								|
| **shortTime**		| Boolean						| true => Display 12 hours AM|PM 				|
| **minDate**		| (String\|Date\|Moment)		| Minimum selectable date						|
| **maxDate**		| (String\|Date\|Moment)		| Maximum selectable date						|
| **currentDate**	| (String\|Date\|Moment)		| Initial Date									|
| **year**			| Boolean						| true => Has Yearpicker						|
| **date**			| Boolean						| true => Has Datepicker						|
| **disabledDays**	| Array							| Array containing day indices (1-7) to disable	|
| **time**			| Boolean						| true => Has Timepicker						|
| **clearButton**	| Boolean						| true => Show Clear Button						|
| **nowButton**		| Boolean						| true => Show Now Button						|
| **switchOnClick**	| Boolean						| true => Switch view on click (default: false) |
| **cancelText**	| String						| Text for the cancel button (default: Cancel)	|
| **okText**		| String						| Text for the OK button (default: OK)			|
| **clearText**		| String						| Text for the Clear button (default: Clear)	|
| **nowText**		| String						| Text for the Now button (default: Now)		|
| **triggerEvent**		| String						| Event to fire the calendar (default: focus)		|
| **monthPicker**	| Boolean						| true => Act as monthpicker (hide calendar) (default: false) |
| **weekStart**	| Integer (0 -> 6)						| 1 => Set monday as first day of week (default: 0, sunday) |
| **lang**	| String						| 'fr' => Set language of calendar to french (default: 'en', english. Any available language included in Moment.js) |



### Events

| Name				| Parameters				| Description										|
| ----------------- | ------------------------- | ------------------------------------------------- |
| **beforeChange**	| event, date				| OK button is clicked								|
| **change**		| event, date				| OK button is clicked and input value is changed	|
| **yearSelected**	        | event, date			        | New year is selected								|
| **dateSelected**	| event, date				| New date is selected								|
| **open**	        | event				        | datepicker is opened								|
| **close**	        | event				        | datepicker is closed								|


### Methods

        $('input').bootstrapMaterialDatePicker('setDate', moment());

| Name				| Parameter					| Description					|
| ----------------- | ------------------------- | ----------------------------- |
| **setDate**		| (String\|Date\|Moment)	| Set initial date				|
| **setMinDate**	| (String\|Date\|Moment)	| Set minimum selectable date	|
| **setMaxDate**	| (String\|Date\|Moment)	| Set maximum selectable date	|
| **destroy**		| NULL						| Destroy the datepicker		|
