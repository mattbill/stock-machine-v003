

//Analysis page
angular.module('stockMachineApp').controller('AnalysisCtrl', ['$scope', '$modal', 'StocksServ', function($scope, $modal, StocksServ) {
    'use strict';
    var vm = this;


    // PRIVATE

    function init() {
        $('#symbolInput').focus();
    }


    // PUBLIC

    function openExternalUrl(command) {
        var url;
        var symbol = StocksServ.currStock.symbol;

        if (symbol) {
            url =
                (typeof vm.externalUrls[command] === 'function') ? vm.externalUrls[command](symbol) :
                (typeof vm.externalUrls) ? vm.externalUrls[command]+symbol :
                null;

            if (url) {
                window.open(url);
            }
        }
    }

    function openRecentStockListModal() {
        $modal.open({
            animation: true,
            templateUrl: 'static/dev/modules/stock-machine/modals/recent-stock-list-modal.html',
            controller: 'RecentStockListModalCtrl as vm',
            size: 'lg'
        });
    }


    vm.externalUrls = {
        'yahooCharts': function(symbol) {
            return 'http://finance.yahoo.com/echarts?s='+ symbol;
        },
        'yahooNews': function(symbol) {
            return 'http://finance.yahoo.com/q/h?s='+ symbol +'+Headlines';
        }
    };
    vm.StocksServ = StocksServ;
    vm.openExternalUrl = openExternalUrl;
    vm.openRecentStockListModal = openRecentStockListModal;

    init();
}]);
