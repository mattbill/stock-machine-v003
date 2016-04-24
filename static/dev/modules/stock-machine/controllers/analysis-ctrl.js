

//Analysis page
angular.module('stockMachineApp').controller('analysisCtrl', ['$scope', '$http', '$modal', '$timeout', 'utilsServ', function($scope, $http, $modal, $timeout, utilsServ) {
    'use strict';
    var vm = this;


    //-------------------- PRIVATE --------------------

    //Add stock to recent stock list
    function addToStockList(stockObj) {
        var symbol = stockObj.symbol;
        vm.stockList.unshift(stockObj);
        console.log(symbol+' added to recent stocks');
    }

    //Analyze a single stock
    function analyzeOneStock(symbol) {
        console.log('\nAnalyzing '+symbol);

        //XHR request to backend
        //TODO@mattbill: use old URI after I get a stock API working
        //$http.get('data/get-stock-info/?symbol='+symbol)
        $http.get('data/get-stock-from-db/?symbol='+symbol)
            .success(function(data, status, headers, config) {
                if (typeof data === 'string' && data.match(/error/gi)) {
                    console.error(data);
                } else {
                    console.log(symbol, data);

                    //Load response as stock
                    addToStockList(data);
                    loadFromStockList(0);
                }
            })
            .error(function(data, status, headers, config) {
                console.log('ERROR with stock: '+symbol, '\n');
            })
            .finally(function(){
                //Analyze next stock
                analyzeStocks();
            });

    }

    //Analyze an array of stocks, one-by-one
    function analyzeStocks() {
        //Update symbol <input>
        vm.stocksInput = vm.stocksToAnalyze.join(', ');

        //If there are any stocks left to analyze, analyze a single stock
        if (vm.stocksToAnalyze.length >= 1) {
            var nextSymbol = vm.stocksToAnalyze.shift();
            if (nextSymbol) {
                analyzeOneStock(nextSymbol);
            } else {
                //nextSymbol was blank. User must have had an extra comma.
                analyzeStocks();
            }

            //Else we are done
        } else {
            console.log('DONE analyzing all stocks.');
        }
    }

    //Load stocks from localStoage
    function loadStocksFromLocalStorage() {
        console.log('Loading stocks form localStorage');
        if (localStorage.recentStocks) {
            vm.stockList = JSON.parse(localStorage.recentStocks);
        }
    }

    //Initialize
    function init() {
        //Watch if vm.stockList change. If yes, update localStorage.
        $scope.$watchCollection('vm.stockList', function(){
            saveStocksToLocalStorage();
        });

        //Load stocks
        loadStocksFromLocalStorage();

        //Focus in symbolInput
        $('#symbolInput').focus();
    }

    //Saves stocks to localStoage
    function saveStocksToLocalStorage() {
        console.log('Saving stocks to localStorage\n\n');
        var stockJson = JSON.stringify(vm.stockList);

        //Remove Angular hash's from JSON
        localStorage.recentStocks = stockJson.replace(/,"\$\$\w+":"[a-z0-9]+"/g, '');
    }



    //-------------------- PUBLIC --------------------



    //Start analyze a comma-separated string/list of stocks (probably from the main input field)
    function analyzeListOfStocks(stocksStr) {
        console.log('Starting stock vm...');
        vm.stocksToAnalyze = stocksStr.toUpperCase().replace(/ /g, '').split(',');
        analyzeStocks();
    }

    //Delete stock
    function deleteStock(index) {
        //Delete from array
        vm.stockList.splice(index, 1);

        //Load next stock
        $timeout(function(){
            loadFromStockList(index);
        });
    }

    //Check if percentageDiscount is bad
    function isBadStockMarket(stockMarket) {
        if (stockMarket) {
            return ( stockMarket.indexOf('OT') >= 0 );
        }
    }

    //Load a stock
    function loadFromStockList(index) {
        var index = index*1;
        var currStock = vm.stockList[index];
        if (currStock) {
            var symbol = currStock.symbol;
            vm.currStock = currStock;
            window.stock = currStock;   //Helps with debugging

            //Load stock chart in iframe
            var yChartsUrl = (currStock.symbol) ? vm.externalUrls.yahooCharts(symbol) : '';
            $('#yChartsIframe').attr('src', yChartsUrl);

            //Place focus on stock symbol. Great UX if you are navigating with keyboard.
            $timeout(function(){
                var nthChild = index+1;
                var selector = '#recent-stock-list li:nth-child('+nthChild+') a:last';
                $(selector).focus();
            });
        }
    }

    //Opens external URL's in a new window
    function openExternalUrl(command) {
        var url;
        var symbol = vm.currStock.symbol;

        //Only continue if we have a symbol
        if (symbol) {
            url =
                (typeof vm.externalUrls[command] === 'function') ? vm.externalUrls[command](symbol) :
                (typeof vm.externalUrls) ? vm.externalUrls[command]+symbol :
                null;


            //If we have a URL, open it
            if (url) {
                window.open(url);
            }
        }
    }

    //Opens the recentStockListModal
    function openRecentStockListModal(size) {

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'recentStockListModal.html',
            controller: 'recentStockListModalCtrl',
            size: 'lg',
            resolve: {
                analysis: function () {
                    console.log('analyis 1');
                    return $scope.analysis;
                }
            }
        });
    }

    //Determine what CSS class to use depending on percentageDiscount
    function percentageDiscountCssClass(stockObj) {
        var cssClass = '';
        if (stockObj && stockObj.calcs) {
            var percentageDiscount = stockObj.calcs.percentageDiscount;

            if (utilsServ.isNum(percentageDiscount) === false) {
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

    //Do calculations
    function redoCalcs(field, value) {
        console.log('(Re)doing calcs');

        //Vars
        var currStock = vm.currStock;

        //If not enough info, don't continue
        if (value === '' || currStock.size === 0) {
            return;
        }

        var data = {
            field: field,
            value: value,
            stockObj: currStock
        };

        //XHR
        $http({
            method: 'POST',
            url: 'data/redo-calcs/',
            data: data
        })
            .success(function(data, status, headers, config) {
                var stockObj = data;
                var symbol = stockObj.symbol;

                //Update stockObj
                vm.currStock.calcs = stockObj.calcs;

            })
            .error(function(data, status, headers, config) {
                console.log('ERROR: RedoCalcs failed');
            });
    }



    //--------------------  --------------------


    vm.currStock = null;
    vm.externalUrls = {
        'yahooCharts': function(symbol) {
            return 'http://finance.yahoo.com/echarts?s='+ symbol;
        },
        'yahooNews': function(symbol) {
            return 'http://finance.yahoo.com/q/h?s='+ symbol +'+Headlines';
        }
    };
    vm.stocksInput = '';
    vm.stocksToAnalyze = [];
    vm.stockList = [];

    vm.analyzeListOfStocks = analyzeListOfStocks;
    vm.deleteStock = deleteStock;
    vm.isBadStockMarket = isBadStockMarket;
    vm.loadFromStockList = loadFromStockList;
    vm.openExternalUrl = openExternalUrl;
    vm.openRecentStockListModal = openRecentStockListModal;
    vm.percentageDiscountCssClass = percentageDiscountCssClass;
    vm.redoCalcs = redoCalcs;

    //Initialize
    init();
}]);
