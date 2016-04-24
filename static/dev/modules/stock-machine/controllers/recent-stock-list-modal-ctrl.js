
//Controller for RecentStocks modal
angular.module('stockMachineApp').controller('recentStockListModalCtrl', ['$scope', '$modalInstance', 'analysis', function($scope, $modalInstance, analysis) {
    'use strict';

    $scope.analysis = analysis;


    $scope.modalOk = function () {
        $modalInstance.close();
    };

    $scope.modalCancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
