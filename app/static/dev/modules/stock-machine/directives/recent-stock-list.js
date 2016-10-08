
angular.module('stockMachineApp').directive('recentStockList', [function() {
    'use strict';

    return {
        restrict: 'E',
        templateUrl: 'static/dev/modules/stock-machine/directives/recent-stock-list.html'
    };
}]);
