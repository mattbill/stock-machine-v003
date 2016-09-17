
//Directive for stock calculations <input> fields
angular.module('stockMachineApp').directive('stockInputCalc', ['StocksServ', function(StocksServ) {
    'use strict';

    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            key: '@',
            label: '@',
            tooltip: '@',
            readonly: '@'
        },
        template: '' +
            '<div class="control-group">' +
            '   <div class="form-group row">'+
            '       <label class="control-label col-md-4" for="{{key}}">{{label}}</label>' +
            '       <div class="col-md-2" ng-show="!readonly">' +
            '           <input type="text" class="form-control" id="{{key}}" ng-model="vm.StocksServ.currStock.calcs[key]" ng-blur="vm.redoCalcs(key, $event)" /> ' +
            '       </div>' +
            '       <div class="col-md-2" ng-show="readonly">' +
            '           <input  type="text" class="form-control" id="{{key}}" ng-model="vm.StocksServ.currStock.calcs[key]" readonly /> ' +
            '       </div>' +
            '       <div class="col-md6" style="padding:7px 15px 0 15px" ng-transclude></div>' +
            '   </div>' +
            '</div>',
        controllerAs: 'vm',
        controller: function() {
            var vm = this;

            function redoCalcs(key, $event) {
                vm.StocksServ.redoCalcs(key, $event.target.value);
            }

            vm.redoCalcs = redoCalcs;
            vm.StocksServ = StocksServ;
        }
    };
}]);
