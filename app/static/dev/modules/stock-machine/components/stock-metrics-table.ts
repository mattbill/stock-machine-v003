declare var angular: any;

angular.module('stockMachineApp').component('stockMetricsTable', {
    bindings: {},
    templateUrl: '/modules/stock-machine/components/stock-metrics-table.html',
    controller: function($scope, StocksServ) {
        var $ctrl = this;

        // PRIVATE

        function activate() {
            $scope.$watch('$ctrl.StocksServ.currStock', function() {
                var currStock = StocksServ.currStock;
                if (!currStock) { return }

                $ctrl.tableData = makeTableData(currStock.nums);
                $ctrl.averages = makeAverages(currStock.nums);
            });
        }

        function makeAverages(currStockNums) {
            var averages = {
                roic: currStockNums.roic.numbers.average,
                bvps: currStockNums.bvps.growths.average,
                sales: currStockNums.sales.growths.average,
                eps: currStockNums.eps.growths.average,
                cashFlow: currStockNums.cashFlow.growths.average
            };
            return averages;
        }

        function makeTableData(currStockNums) {
            var yearData = {};
            var metricKeys = [
                //'roic',
                'bvps',
                'sales',
                'eps',
                'cashFlow',
                'debt',
                'pe',
                'netIncome'
            ];

            //Loop through metrics, regrouping metric data by year
            angular.forEach(metricKeys, function(metricKey){
                var metricObj = currStockNums[metricKey];

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

            //Now turn data into an array, sorted by newest to oldest years
            var tableData = [];
            angular.forEach(yearData, function(yearObj, year){
                yearObj.year = year;
                tableData.unshift(yearObj);
            });

            try {
                tableData[0].roic = { num: currStockNums.roic.numbers.arr[1] };
                tableData[1].roic = { num: currStockNums.roic.numbers.arr[5] };
            } catch(error) {}

            return tableData;
        }


        // PUBLIC

        $ctrl.averages = null;
        $ctrl.tableData = null;
        $ctrl.StocksServ = StocksServ;
        activate();
    }
});
