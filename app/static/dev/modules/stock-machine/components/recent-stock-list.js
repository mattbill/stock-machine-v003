
angular.module('stockMachineApp').component('recentStockList', {
    templateUrl: 'static/dev/modules/stock-machine/components/recent-stock-list.html',
    controller: function(StocksServ) {
        var $ctrl = this;
        $ctrl.StocksServ = StocksServ;
    }
});
