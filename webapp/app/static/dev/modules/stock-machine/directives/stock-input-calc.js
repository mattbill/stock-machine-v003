
angular.module('stockMachineApp').directive('stockInputCalc', ['StocksServ', function(StocksServ) {
    'use strict';

    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            key: '@',
            label: '@',
            tooltip: '@',
            readonly: '@'
        },
        templateUrl: 'static/dev/modules/stock-machine/directives/stock-input-calc.html',
        controllerAs: 'vm',
        controller: function() {
            var vm = this;

            function redoCalcs(key, $event) {
                vm.StocksServ.redoCalcs(key, $event.target.value);
            }

            vm.redoCalcs = redoCalcs;
            vm.StocksServ = StocksServ;
        }
    };
}]);
