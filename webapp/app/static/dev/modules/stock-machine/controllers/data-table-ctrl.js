

//Automation page
angular.module('stockMachineApp').controller('dataTableCtrl', ['$scope', '$http', function($scope, $http) {
    'use strict';
    var vm = this;


    //-------------------- PRIVATE --------------------

    function clearTable() {
        vm.data = [];
    }

    function init() {
        //Watch and clear table
        $scope.$watch('vm.search', function(){
            clearTable();
        }, true);

        getStocks();
    }


    //-------------------- PUBLIC --------------------

    function getStocks() {
        //Clear
        clearTable();

        //bugfix: smart-table doesn't like reinitializing the table after an XHR request. Use this and ng-if to destroy/recreate the smart-table
        vm.state = 'loading';

        var whereArr = [];
        angular.forEach(vm.search, function(val, key){
            val = val.trim();
            if (val) {
                //If they did not add an operator (e.g. >|<|=, etc) add ='' for them
                if (!val.match(/>|<|!=|=|not like|like|is not null|is null/gi)) {
                    val = '="'+val+'"';
                }

                //Add in the key/column name
                val = val.replace(/(>|<|!=|=|not like|like|is not null|is null)/gi, key+' $1 ');
                whereArr.push(val);
            }
        });

        //Finish whereCond
        var whereCond = whereArr.join('  AND  ');
        console.log('Getting stocks WHERE '+whereCond);

        //XHR
        $http({
            method: 'POST',
            url: '/api/stocks/search/',
            data: {
                whereCond: whereCond
            }
        })
        .success(function(data, status, headers, config) {
            if (angular.isArray(data) === false) {
                console.error( $('<div></div>').html(data).text() );
                vm.state = 'loaded';

            } else {
                vm.data = data.map(function(row){
                    return JSON.parse(row['allInfoAsJson']);
                });
                vm.state = 'loaded';
            }
        })
        .error(function(data, status, headers, config) {
            console.log('ERROR : '+data, '\n');
        });
    }



    //--------------------  --------------------

    vm.data = [];
    vm.search = {};
    vm.state = '';

    vm.getStocks = getStocks;

    init();
}]);
