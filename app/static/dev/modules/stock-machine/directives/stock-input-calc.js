
angular.module('stockMachineApp').directive('stockInputCalc', ['StocksServ', function(StocksServ) {
    'use strict';

    return {
        restrict: 'E',
        transclude: true,
        scope: {
            key: '@',
            label: '@',
            readonly: '@'
        },
        templateUrl: 'static/dev/modules/stock-machine/directives/stock-input-calc.html',
        controllerAs: '$ctrl',
        controller: function() {
            var $ctrl = this;

            function redoCalcs(key, $event) {
                $ctrl.StocksServ.redoCalcs(key, $event.target.value);
            }

            $ctrl.redoCalcs = redoCalcs;
            $ctrl.StocksServ = StocksServ;
        }
    };
}]);
