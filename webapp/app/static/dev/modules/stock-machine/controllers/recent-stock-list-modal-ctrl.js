
//Controller for RecentStocks modal
angular.module('stockMachineApp').controller('recentStockListModalCtrl', ['$scope', '$modalInstance', 'StocksServ', function($scope, $modalInstance, StocksServ) {
    'use strict';
    var vm = this;

    function modalOk() {
        $modalInstance.close();
    }

    function modalCancel() {
        $modalInstance.dismiss('cancel');
    }

    vm.StocksServ = StocksServ;
    vm.modalOk = modalOk;
    vm.modalCancel = modalCancel;
}]);
