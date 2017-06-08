Material DateTimePicker
===========
Compatible with JQuery and AngularJS =)

Originaly designed for Bootstrap Material, the V3.* is now completely standalone and responsive.
Project based on "T00rk/bootstrap-material-datetimepicker" initiative, including layout adjustments and adapting to use within AngularJS.

<p>
  <a href="https://gitter.im/miamarti/bootstrap-material-datetimepicker?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge" target="_blank"><img src="https://badges.gitter.im/Join%20Chat.svg"></a>
  <a href="https://gitlab.com/miamarti/bootstrap-material-datetimepicker" target="_blank"><img src="https://img.shields.io/badge/gitlab-materialDatetimepicker-yellow.svg"></a>
  <img src="https://img.shields.io/badge/materialDatetimepicker-release-green.svg">
  <img src="https://img.shields.io/badge/version-3.11.9-blue.svg">
  <img src="https://img.shields.io/bower/v/bootstrap.svg">
  <img src="https://img.shields.io/github/license/mashape/apistatus.svg">
  <a href="http://waffle.io/miamarti/Material-DateTimePicker"><img alt='Stories in Ready' src='https://badge.waffle.io/miamarti/bootstrap-material-datetimepicker.svg?label=ready&title=Ready' height="21" /></a>
</p>

<img src="https://miamarti.github.io/Material-DateTimePicker/app/img/ezgif-1-4d306cc5b0.gif">

<h3>Live Demo</h3>
[/Material-DateTimePicker/app](https://miamarti.github.io/Material-DateTimePicker/app)

<h3>Dependencies</h3>
Download make the dependencies:

* momentJS
* jQuery

# Bower install de dependency
```
$ bower install ng-datetimepicker-material --save
```

------------------------------------------------------------------------------

# AngularJS
This component is compatible with AngularJS 1.*
## Implementation
```
<ng-datetimepicker ng-model="dataModel" ng-open="noKadete"></ng-datetimepicker>

<!-- Click the icon below -->
<i class="fa fa-bell" ng-click="noKadete()"></i>
```

## Parameters

| Name         | Type     | Dinamic | Mandatory | Description                                                  |
| ------------ | -------  | ------- | --------- | ------------------------------------------------------------ |
| ng-model     | String   | true    | true      | Scope of the attribute that will be the model                |
| ng-open      | Function | true    | true      | Function pointer that opens the component                    |
| ng-mindate   | Date     | true    | true      | Lowest possible date                                         |

## Module AngularJS include
```
angular.module('example', ["ngDatetimepicker"]);
```

------------------------------------------------------------------------------

# JQuery
This component is compatible with JQuery

### Events on jQquery

| Name			| Parameters				| Description										|
| --------------| ------------------------- | ------------------------------------------------- |
| beforeChange	| event, date				| OK button is clicked								|
| change		| event, date				| OK button is clicked and input value is changed	|
| yearSelected	| event, date			    | New year is selected								|
| dateSelected	| event, date				| New date is selected								|
| open	        | event				        | datepicker is opened								|
| close	        | event				        | datepicker is closed								|

### Methods on jQquery
```
$('input').bootstrapMaterialDatePicker('setDate', moment());
```

| Name				| Parameter					| Description					|
| ----------------- | ------------------------- | ----------------------------- |
| **setDate**		| (String\|Date\|Moment)	| Set initial date				|
| **setMinDate**	| (String\|Date\|Moment)	| Set minimum selectable date	|
| **setMaxDate**	| (String\|Date\|Moment)	| Set maximum selectable date	|
| **destroy**		| NULL						| Destroy the datepicker		|


------------------------------------------------------------------------------

## Metrics

[![Throughput Graph](https://graphs.waffle.io/miamarti/bootstrap-material-datetimepicker/throughput.svg)](https://waffle.io/miamarti/bootstrap-material-datetimepicker/metrics/throughput)
