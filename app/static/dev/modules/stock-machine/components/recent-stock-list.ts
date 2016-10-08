declare var angular: any;

angular.module('stockMachineApp').component('recentStockList', {
    bindings: {},
    templateUrl: 'static/dev/modules/stock-machine/components/recent-stock-list.html',
    controller: function(StocksServ) {
        var $ctrl = this;
        $ctrl.StocksServ = StocksServ;
    }
});
