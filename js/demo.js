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
    })
  ;
})();