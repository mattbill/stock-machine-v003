//Format number as percent
angular.module('stockMachineApp').filter('sitePercent', ['$filter', 'utilsServ', function($filter, utilsServ){
    'use strict';

    return function(val, decimalPlaces) {
        //Make sure it's not undefined
        if (typeof val === 'undefined') {
            return '';
        }

        //Defaults
        decimalPlaces = (decimalPlaces) ? decimalPlaces : 1;

        //Vars
        var number;

        //Try converting to number
        number = utilsServ.toNum(val);
        if (utilsServ.isNum(number)) {
            number = $filter('number')(number, decimalPlaces);
            number = number+'%';

            //Else it must be a null or something. Just make sure it is a string so it displays.
        } else {
            number = utilsServ.NAN;
        }



        return number;
    };
}]);
