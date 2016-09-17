
angular.module('stockMachineApp').factory('StocksServ', ['$http', '$log', '$rootScope', '$timeout', 'UtilsServ', function($http, $log, $rootScope, $timeout, UtilsServ) {
    'use strict';


    // PRIVATE

    var stocksToAnalyze = [];

    function addToStockList(stockObj) {
        var symbol = stockObj.symbol;
        stockList.unshift(stockObj);
        $log.log(symbol+' added to recent stocks');
    }

    function analyzeOneStock(symbol) {
        $log.log('\nAnalyzing '+symbol);

        $http.get('api/stocks/from-database/'+symbol)
            .success(function(data) {
                if (typeof data === 'string' && data.match(/error/gi)) {
                    $log.error(data);
                } else {
                    $log.log(symbol, data);
                    addToStockList(data);
                    loadFromStockList(0);
                }
            })
            .error(function() {
                $log.log('ERROR with stock: '+symbol, '\n');
            })
            .finally(function(){
                analyzeStocksArr();
            });

    }

    function analyzeStocksArr() {
        StocksServ.stocksInput = stocksToAnalyze.join(', ');

        if (stocksToAnalyze.length >= 1) {
            analyzeOneStock( stocksToAnalyze.shift() );
        } else {
            $log.log('DONE analyzing all stocks.');
        }
    }

    function loadStocksFromLocalStorage() {
        $log.log('Loading stocks form localStorage');
        if (localStorage.recentStocks) {
            stockList = JSON.parse(localStorage.recentStocks);
        }
    }

    function init() {
        loadStocksFromLocalStorage();

        $rootScope.stockList = stockList;
        $rootScope.$watchCollection('stockList', function(){
            saveStocksToLocalStorage();
        });
    }

    function saveStocksToLocalStorage() {
        $log.log('Saving stocks to localStorage\n\n');
        localStorage.recentStocks = JSON.stringify(angular.copy(stockList));
    }


    // PUBLIC

    var stockList = [];

    function analyzeStocks() {
        $log.log('Starting stock $ctrl...');
        stocksToAnalyze = StocksServ.stocksInput.toUpperCase().replace(/ /g, '').split(',').filter(function(val) { return val; });
        analyzeStocksArr();
    }

    function deleteStock(index) {
        stockList.splice(index, 1);
        $timeout(function(){
            loadFromStockList(index);
        });
    }

    function isBadStockMarket(stockMarket) {
        if (stockMarket) {
            return ( stockMarket.indexOf('OT') >= 0 );
        }
    }

    function loadFromStockList(index) {
        var index = index*1;
        var currStock = stockList[index];
        if (currStock) {
            StocksServ.currStock = currStock;

            $timeout(function(){
                var nthChild = index+1;
                var selector = '#recent-stock-list li:nth-child('+nthChild+') a:last';
                $(selector).focus();
            });
        }
    }

    function percentageDiscountCssClass(stockObj) {
        var cssClass = '';
        if (stockObj && stockObj.calcs) {
            var percentageDiscount = stockObj.calcs.percentageDiscount;

            if (UtilsServ.isNum(percentageDiscount) === false) {
                cssClass = 'discount-not-numeric';
            } else if (percentageDiscount < 0) {
                cssClass = 'negative-discount';
            } else if (percentageDiscount < 20) {
                cssClass = 'some-discount';
            } else if (percentageDiscount < 50) {
                cssClass = 'great-discount';
            } else if (percentageDiscount >= 50) {
                cssClass = 'reached-mos';
            }

        }
        return cssClass;
    }

    function redoCalcs(field, value) {
        $log.log('(Re)doing calcs');
        var currStock = StocksServ.currStock;

        //If not enough info, don't continue
        if (value === '' || currStock.size === 0) {
            return;
        }

        var data = {
            field: field,
            value: value,
            stockObj: currStock
        };

        $http({
            method: 'POST',
            url: '/api/stocks/redo-calcs/',
            data: data
        })
        .success(function(data, status, headers, config) {
            var stockObj = data;
            StocksServ.currStock.calcs = stockObj.calcs;

        })
        .error(function(data, status, headers, config) {
            $log.log('ERROR: RedoCalcs failed');
        });
    }


    init();
    var StocksServ = {
        stocksInput: '',
        stockList: stockList,
        analyzeStocks: analyzeStocks,
        deleteStock: deleteStock,
        isBadStockMarket: isBadStockMarket,
        loadFromStockList: loadFromStockList,
        percentageDiscountCssClass: percentageDiscountCssClass,
        redoCalcs: redoCalcs
    };
    return StocksServ;
}]);
