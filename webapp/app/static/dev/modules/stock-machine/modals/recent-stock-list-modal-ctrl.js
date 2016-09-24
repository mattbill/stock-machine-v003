
//Controller for RecentStocks modal
angular.module('stockMachineApp').controller('RecentStockListModalCtrl', function($uibModalInstance, StocksServ) {
    'use strict';
    var $ctrl = this;

    function modalOk() {
        $uibModalInstance.close();
    }

    function modalCancel() {
        $uibModalInstance.dismiss('cancel');
    }

    $ctrl.StocksServ = StocksServ;
    $ctrl.modalOk = modalOk;
    $ctrl.modalCancel = modalCancel;
});
