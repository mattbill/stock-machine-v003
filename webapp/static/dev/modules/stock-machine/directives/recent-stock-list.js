
//Directive for recent stocks
angular.module('stockMachineApp').directive('recentStockList', [function() {
    'use strict';

    return {
        restrict: 'E',
        replace: true,
        template: '' +
            '<div id="recent-stock-list">' +
            '   <strong>Recent Stocks:</strong>' +
            '   <ul ui-sortable="{ axis:\'y\' }" ng-model="vm.stockList">' +
            '       <li ng-repeat="stockObj in vm.stockList track by $index" ng-class="vm.percentageDiscountCssClass(stockObj)">' +
            '           <a href="" ng-click="vm.deleteStock($index);"><i class="fa fa-times"></i></a>&nbsp;' +
            '           <a href="" ng-click="vm.loadFromStockList($index); modalOk();">{{stockObj.symbol}}</a>' +
            '       </li>' +
            '   </ul>' +
            '</div>' +
            ''
    };
}]);
