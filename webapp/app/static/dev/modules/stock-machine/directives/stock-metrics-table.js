
//Directive for top table of stock metrics
angular.module('stockMachineApp').directive('stockMetricsTable', [function() {
    'use strict';

    return {
        restrict: 'E',
        replace: true,
        template: '' +
            '<div>' +
            '   <table class="table table-condensed table-striped">' +
            '       <thead>' +
            '           <tr>' +
            '               <th>&nbsp;</th>' +
            '               <th>ROIC</th>' +
            '               <th>BVPS</th>' +
            '               <th>&nbsp;</th>' +
            '               <th>Sales</th>' +
            '               <th>&nbsp;</th>' +
            '               <th>EPS</th>' +
            '               <th>&nbsp;</th>' +
            '               <th>Cash Flow</th>' +
            '               <th>&nbsp;</th>' +
            '               <th>Debt</th>' +
            '               <th>PE</th>' +
            '               <th>Net Income</th>' +
            '           </tr>' +
            '       </thead>' +
            '       <tbody>' +
            '           <tr ng-repeat="yearObj in tableData">' +
            '               <td class="bold">{{yearObj.year}}</td>' +
            '               <td ng-class="yearObj.roic.num | redGreenNum">{{yearObj.roic.num | sitePercent}}</td>' +

            '               <td class="gray-text">{{yearObj.bvps.num | siteNum}}</td>' +
            '               <td ng-class="yearObj.bvps.growth | redGreenNum">{{yearObj.bvps.growth | sitePercent}}</td>' +

            '               <td class="gray-text">{{yearObj.sales.num | siteNum}}</td>' +
            '               <td ng-class="yearObj.sales.growth | redGreenNum">{{yearObj.sales.growth | sitePercent}}</td>' +

            '               <td class="gray-text">{{yearObj.eps.num | siteNum}}</td>' +
            '               <td ng-class="yearObj.eps.growth | redGreenNum">{{yearObj.eps.growth | sitePercent}}</td>' +

            '               <td class="gray-text">{{yearObj.cashFlow.num | siteNum}}</td>' +
            '               <td ng-class="yearObj.cashFlow.growth | redGreenNum">{{yearObj.cashFlow.growth | sitePercent}}</td>' +

            '               <td class="gray-text">{{yearObj.debt.num | siteNum}}</td>' +
            '               <td class="gray-text">{{yearObj.pe.num | siteNum}}</td>' +
            '               <td class="gray-text">{{yearObj.netIncome.num | siteNum}}</td>' +
            '           </tr>' +
            '           <tr>' +
            '               <td class="bold" style="min-width:100px;">Avg of <br>Up To 5 Latest<br>Growth Rates:</td>' +
            '               <td ng-class="averages.roic | redGreenNum">{{averages.roic | sitePercent}}</td>' +
            '               <td>&nbsp;</td>' +
            '               <td ng-class="averages.bvps | redGreenNum">{{averages.bvps | sitePercent}}</td>' +
            '               <td>&nbsp;</td>' +
            '               <td ng-class="averages.sales | redGreenNum">{{averages.sales | sitePercent}}</td>' +
            '               <td>&nbsp;</td>' +
            '               <td ng-class="averages.eps | redGreenNum">{{averages.eps | sitePercent}}</td>' +
            '               <td>&nbsp;</td>' +
            '               <td ng-class="averages.cashFlow | redGreenNum">{{averages.cashFlow | sitePercent}}</td>' +
            '               <td>&nbsp;</td>' +
            '               <td>&nbsp;</td>' +
            '               <td>&nbsp;</td>' +
            '           </tr>' +
            '           <tr ng-if="vm.StocksServ.currStock">' +
            '               <td>&nbsp;</td>' +
            '               <td>' +
            '                   <simple-chart data="vm.StocksServ.currStock.nums.roic.numbers.arr"></simple-chart>' +
            '               </td>' +
            '               <td colspan="2">' +
            '                   <simple-chart data="vm.StocksServ.currStock.nums.bvps.numbers.arr"></simple-chart>' +
            '               </td>' +
            '               <td colspan="2">' +
            '                   <simple-chart data="vm.StocksServ.currStock.nums.sales.numbers.arr"></simple-chart>' +
            '               </td>' +
            '               <td colspan="2">' +
            '                   <simple-chart data="vm.StocksServ.currStock.nums.eps.numbers.arr"></simple-chart>' +
            '               </td>' +
            '               <td colspan="2">' +
            '                   <simple-chart data="vm.StocksServ.currStock.nums.cashFlow.numbers.arr"></simple-chart>' +
            '               </td>' +
            '               <td colspan="1">' +
            '                   <simple-chart data="vm.StocksServ.currStock.nums.debt.numbers.arr"></simple-chart>' +
            '               </td>' +
            '               <td colspan="1">' +
            '                   <simple-chart data="vm.StocksServ.currStock.nums.pe.numbers.arr"></simple-chart>' +
            '               </td>' +
            '               <td colspan="1">' +
            '                   <simple-chart data="vm.StocksServ.currStock.nums.netIncome.numbers.arr"></simple-chart>' +
            '               </td>' +
            '           </tr>' +
            '       </tbody>' +
            '   </table>' +
            '</div>',
        controller: ['$scope', function($scope) {
            $scope.$watch('vm.StocksServ.currStock', function(){

                var currStock = $scope.vm.StocksServ.currStock;
                if (_.size(currStock) > 0) {

                    //Vars
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


                    //Add vars to $scope
                    $scope.tableData = tableData;
                    $scope.averages = averages;
                }


            });
        }]
    };
}]);
