
angular.module('stockMachineApp').directive('recentStockList', [function() {
    'use strict';

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'static/dev/modules/stock-machine/directives/recent-stock-list.html'
    };
}]);
