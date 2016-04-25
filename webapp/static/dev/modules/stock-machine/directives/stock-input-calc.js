
//Directive for stock calculations <input> fields
angular.module('stockMachineApp').directive('stockInputCalc', [function() {
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
            '           <input type="text" class="form-control" id="{{key}}" ng-model="$parent.vm.currStock.calcs[key]" ng-blur="$parent.vm.redoCalcs(key, $event.target.value)" /> ' +
            '       </div>' +
            '       <div class="col-md-2" ng-show="readonly">' +
            '           <input  type="text" class="form-control" id="{{key}}" ng-model="$parent.vm.currStock.calcs[key]" readonly /> ' +
            '       </div>' +
            '       <div class="col-md6" style="padding:7px 15px 0 15px" ng-transclude></div>' +
            '   </div>' +
            '</div>'
    };
}]);
