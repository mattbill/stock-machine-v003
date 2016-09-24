
//Controller for RecentStocks modal
angular.module('stockMachineApp').component('recentStockListModal', {
    templateUrl: 'static/dev/modules/stock-machine/modals/recent-stock-list-modal.html',
    bindings: {
        modalInstance: '<'
    },
    controller: function(StocksServ) {
        'use strict';
        var $ctrl = this;

        function modalOk() {
            $ctrl.modalInstance.close();
        }

        function modalCancel() {
            $ctrl.modalInstance.dismiss('cancel');
        }

        $ctrl.StocksServ = StocksServ;
        $ctrl.modalOk = modalOk;
        $ctrl.modalCancel = modalCancel;
    }
});
