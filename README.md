# bootstrap-material-datepicker
Datepicker for bootstrap-material

### Prerequisites
Bootstrap 3 [http://getbootstrap.com/](http://getbootstrap.com/)
bootstrap-material-design [http://fezvrasta.github.io/bootstrap-material-design/](http://fezvrasta.github.io/bootstrap-material-design/)
jquery [http://jquery.com/download/](http://jquery.com/download/)
momentjs [http://momentjs.com/](http://momentjs.com/)

### Usage
	$('input').bootstrapMaterialDatePicker();
	
### Parameters
**format** : String  => MomentJS Format
**minDate** : (String|Date|Moment) => Minimum selectable date
**maxDate** : (String|Date|Moment) => Maximum selectable date
**currentDate** : (String|Date|Moment) => Initial Date

### Events
**beforeChange** : OK button is clicked
**change** : OK button is clicked and input value is changed
**dateSelected** : New date is selected

### Methods
**setDate(String|Date|Moment)** : Set the initial date
**setMinDate(String|Date|Moment)** : Set minimum selectable date
**setMaxDate(String|Date|Moment)** : Set maximum selectable date
	