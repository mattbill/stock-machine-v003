declare var angular: any;

angular.module('stockMachineApp').component('stockMetricsTable', {
    bindings: {},
    templateUrl: '/scripts/stock-machine/components/stock-metrics-table.html',
    controller: class {
        private $scope: any;
        
        public StocksServ: any;
        public averages: any = null;
        public tableData: any = null;


        // PRIVATE

        constructor($scope, StocksServ) {
            this.$scope = $scope;
            this.StocksServ = StocksServ;

            this.$scope.$watch('$ctrl.StocksServ.currStock', () => {
                var currStock = this.StocksServ.currStock;
                if (!currStock) { return }

                this.tableData = this.makeTableData(currStock.nums);
                this.averages = this.makeAverages(currStock.nums);
            });
        }

        makeAverages(currStockNums) {
            var averages = {
                roic: currStockNums.roic.numbers.average,
                bvps: currStockNums.bvps.growths.average,
                sales: currStockNums.sales.growths.average,
                eps: currStockNums.eps.growths.average,
                cashFlow: currStockNums.cashFlow.growths.average
            };
            return averages;
        }

        makeTableData(currStockNums) {
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
            angular.forEach(metricKeys, (metricKey) => {
                var metricObj = currStockNums[metricKey];

                angular.forEach(metricObj.numbers.arr, (val, year) => {
                    if (typeof yearData[year] === 'undefined') {
                        yearData[year] = {};
                    }
                    if (typeof yearData[year][metricKey] === 'undefined') {
                        yearData[year][metricKey] = {};
                    }
                    yearData[year][metricKey].num = val;
                });

                if (metricObj.growths) {
                    angular.forEach(metricObj.growths.arr, (val, year) => {
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
            angular.forEach(yearData, (yearObj, year) => {
                yearObj.year = year;
                tableData.unshift(yearObj);
            });

            try {
                tableData[0].roic = { num: currStockNums.roic.numbers.arr[1] };
                tableData[1].roic = { num: currStockNums.roic.numbers.arr[5] };
            } catch(error) {}

            return tableData;
        }
    }
});
