
angular.module('stockMachineApp').directive('stockMetricsTable', [function() {
    'use strict';

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'static/dev/modules/stock-machine/directives/stock-metrics-table.html',
        controller: function($scope) {
            $scope.$watch('vm.StocksServ.currStock', function(){

                var currStock = $scope.vm.StocksServ.currStock;
                if (_.size(currStock) > 0) {
                    var nums = currStock.nums;
                    var yearData = {};
                    var metricKeys = [
                        //'roic',
                        'bvps',
                        'sales',
                        'eps',
                        'cashFlow',
                        'debt',
                        'pe',
                        'netIncome',
                    ];


                    //Loop through metrics, regrouping metric data by year
                    angular.forEach(metricKeys, function(metricKey){
                        var metricObj = nums[metricKey];

                        angular.forEach(metricObj.numbers.arr, function(val, year){
                            if (typeof yearData[year] === 'undefined') {
                                yearData[year] = {};
                            }
                            if (typeof yearData[year][metricKey] === 'undefined') {
                                yearData[year][metricKey] = {};
                            }
                            yearData[year][metricKey].num = val;
                        });

                        if (metricObj.growths) {
                            angular.forEach(metricObj.growths.arr, function(val, year){
                                if (typeof yearData[year] === 'undefined') {
                                    yearData[year] = {};
                                }
                                if (typeof yearData[year][metricKey] === 'undefined') {
                                    yearData[year][metricKey] = {};
                                }
                                yearData[year][metricKey].growth = val;
                            });
                        }
                    });
                    //console.log(yearData);


                    //Now turn data into an array, sorted by newest to oldest years
                    var tableData = [];
                    angular.forEach(yearData, function(yearObj, year){
                        yearObj.year = year;
                        tableData.unshift(yearObj);
                    });


                    //Add ROIC to data
                    try {
                        tableData[0].roic = { num: nums.roic.numbers.arr[1] };
                        tableData[1].roic = { num: nums.roic.numbers.arr[5] };
                        //console.log(tableData);
                    } catch(error) {}


                    //Remember averages
                    var averages = {
                        'roic': nums.roic.numbers.average,
                        'bvps': nums.bvps.growths.average,
                        'sales': nums.sales.growths.average,
                        'eps': nums.eps.growths.average,
                        'cashFlow': nums.cashFlow.growths.average
                        //'debt': nums.debt.growths.average,
                        //'pe': nums.pe.growths.average,
                        //'netIncome': nums.netIncome.growths.average,
                    };


                    $scope.tableData = tableData;
                    $scope.averages = averages;
                }
            });
        }
    };
}]);
