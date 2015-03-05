# bootstrap-material-datepicker
DateTimePicker for bootstrap-material

### Updates

    2015-03-04 - Added Time picker

### Prerequisites

Bootstrap 3 [http://getbootstrap.com/](http://getbootstrap.com/)

bootstrap-material-design [http://fezvrasta.github.io/bootstrap-material-design/](http://fezvrasta.github.io/bootstrap-material-design/)

jquery [http://jquery.com/download/](http://jquery.com/download/)

momentjs [http://momentjs.com/](http://momentjs.com/)

### Live Example

Click [here](http://t00rk.github.io/bootstrap-material-datepicker/) to see

### Usage

	$('input').bootstrapMaterialDatePicker();
	
### Parameters

| Name				| Type							| Description				|
| ----------------- | ----------------------------- | ------------------------- |
| **format**		| String						| MomentJS Format			|
| **minDate**		| (String\|Date\|Moment)		| Minimum selectable date	|
| **maxDate**		| (String\|Date\|Moment)		| Maximum selectable date	|
| **currentDate**	| (String\|Date\|Moment)		| Initial Date				|
| **time**			| Boolean						| true => Has Timepicker	|


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

	
