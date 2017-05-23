/*
 * autor: Miller Augusto S. Martins
 * e-mail: miller.augusto@gmail.com
 * github: miamarti
 * */
(function (window, document) {
    "use strict";
    (angular.module('ng.datetimepicker', ['ng'])).directive('ngDatetimepicker', [function () {
        var container = function ($scope, elem) {
                var $this = {
                    input: $(elem).find('.datepicker').bootstrapMaterialDatePicker({
                        format: 'dddd DD MMMM YYYY - HH:mm',
                        cancelText: 'Descartar',
                        clearText: 'Limpar'
                    }),
                    ngOpen: function() {
                        setTimeout(function() {
                            $this.input.trigger('click');
                        }, 100);
                    }
                };
                $scope.ngOpen = $this.ngOpen.bind($this);
            };
        return {
            restrict: 'E',
            scope: {
                ngModel: '=ngModel',
                ngOpen: '=ngOpen'
            },
            link: container,
            template: '<input type="hidden" class="datepicker hide">'
        };
    }]);
})(window, document);
