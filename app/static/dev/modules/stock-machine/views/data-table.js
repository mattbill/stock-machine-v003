

//DataTable page
angular.module('stockMachineApp').component('datatablePage', {
    templateUrl: 'static/dev/modules/stock-machine/views/data-table.html',
    bindings: {},
    controller: function($http, $scope) {
        'use strict';
        var $ctrl = this;


        // PRIVATE

        function clearTable() {
            $ctrl.data = [];
        }

        function init() {
            $scope.$watch('$ctrl.search', function(){
                clearTable();
            }, true);

            getStocks();
        }


        // PUBLIC

        function getStocks() {
            clearTable();

            //bugfix: smart-table doesn't like reinitializing the table after an XHR request. Use this and ng-if to destroy/recreate the smart-table
            $ctrl.state = 'loading';

            var whereArr = [];
            angular.forEach($ctrl.search, function(val, key){
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
                    $ctrl.state = 'loaded';

                } else {
                    $ctrl.data = data.map(function(row){
                        return JSON.parse(row['allInfoAsJson']);
                    });
                    $ctrl.state = 'loaded';
                }
            })
            .error(function(data, status, headers, config) {
                console.log('ERROR : '+data, '\n');
            });
        }



        //--------------------  --------------------

        $ctrl.data = [];
        $ctrl.search = {};
        $ctrl.state = '';

        $ctrl.getStocks = getStocks;

        init();
    }
});
