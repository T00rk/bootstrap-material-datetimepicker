# bootstrap-material-datetimepicker
Material DateTimePicker 

Originaly designed for Bootstrap Material, the V2.0 is now completely standalone and responsive.

### Updates

| Date				| Author			| Description											 |
| ----------------- | ----------------- | ------------------------------------------------------ |
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

[Live example](http://t00rk.github.io/bootstrap-material-datetimepicker/)

### Usage

	$('input').bootstrapMaterialDatePicker();

### bower

	bower install bootstrap-material-datetimepicker
	
### Parameters

| Name				| Type							| Description									|
| ----------------- | ----------------------------- | --------------------------------------------- |
| **format**		| String						| MomentJS Format (default: YYYY-MM-DD)		    |
| **minDate**		| (String\|Date\|Moment)		| Minimum selectable date (default: null)		|
| **maxDate**		| (String\|Date\|Moment)		| Maximum selectable date (default: null)		|
| **currentDate**	| (String\|Date\|Moment)		| Initial Date (default: null)					|
| **date**			| Boolean						| true => Has Datepicker (default: true)		|
| **time**			| Boolean						| true => Has Timepicker (default: true)        |
| **clearButton**	| Boolean						| true => Show Clear Button (default: false) 	|
| **nowButton**		| Boolean						| true => Show Now Button (default: false) 		|
| **switchOnClick**	| Boolean						| true => Switch view on click (default: false) |
| **shortTime**	    | Boolean						| true => 12 hours AM|PM mode (default: false)  |
| **cancelText**	| String						| Text for the cancel button (default: Cancel)	|
| **okText**		| String						| Text for the OK button (default: OK)			|
| **clearText**		| String						| Text for the Clear button (default: Clear)	|
| **nowText**		| String						| Text for the Now button (default: Now)		|
| **lang**		    | String						| Moment.js locale (default: en)		        |
| **weekStart**		| Integer						| Start of the week (default: 0)		        |


### Events

| Name				| Parameters				| Description										|
| ----------------- | ------------------------- | ------------------------------------------------- |
| **beforeChange**	| event, date				| OK button is clicked								|
| **change**		| event, date				| OK button is clicked and input value is changed	|
| **dateSelected**	| event, date				| New date is selected								|


### Methods

        $('input').bootstrapMaterialDatePicker('setDate', moment());

| Name				| Parameter					| Description					|
| ----------------- | ------------------------- | ----------------------------- |
| **setDate**		| (String\|Date\|Moment)	| Set initial date				|
| **setMinDate**	| (String\|Date\|Moment)	| Set minimum selectable date	|
| **setMaxDate**	| (String\|Date\|Moment)	| Set maximum selectable date	|
| **destroy**		| NULL						| Destroy the datepicker		|
