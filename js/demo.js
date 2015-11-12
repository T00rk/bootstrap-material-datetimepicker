/**
 * Created by intelWorx on 11/11/2015.
 */
(function () {
  'use strict';
  angular.module('mdDatetimePickerDemo', [
      'ngMaterialDatePicker'
    ])
    .controller('DemoCtrl', function ($scope) {
      $scope.date = new Date();
      $scope.time = new Date(Date.now() - 3600000);
      $scope.dateTime = new Date();
      $scope.minDate =  moment().subtract(1, 'month');
      $scope.maxDate = moment().add(1, 'month');
    })
  ;
})();