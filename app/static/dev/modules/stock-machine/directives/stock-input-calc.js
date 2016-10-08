
angular.module('stockMachineApp').component('stockInputCalc', {
    transclude: true,
    bindings: {
        key: '@',
        label: '@',
        readonly: '@'
    },
    templateUrl: 'static/dev/modules/stock-machine/directives/stock-input-calc.html',
    controller: function(StocksServ) {
        var $ctrl = this;

        function redoCalcs(key, $event) {
            $ctrl.StocksServ.redoCalcs(key, $event.target.value);
        }

        $ctrl.redoCalcs = redoCalcs;
        $ctrl.StocksServ = StocksServ;
    }
});
