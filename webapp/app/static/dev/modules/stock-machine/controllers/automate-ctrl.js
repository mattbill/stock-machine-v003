

//Automation page
angular.module('stockMachineApp').controller('automateCtrl', ['$scope', '$http', function($scope, $http) {
    'use strict';
    var vm = this;

    //-------------------- PRIVATE --------------------

    var NUM_STOCKS_TO_AUTOMATE = 500,
        automationCount = null,
        automating = false;

    //Automate next stock
    function automateNextStock() {
        automationCount++;
        console.log(automationCount+': Automating stock');

        $http.get('data/automate-next-stock/')
        .success(function(data, status, headers, config) {
            if (typeof data === 'string' && data.match(/error/gi)) {
                console.error(data);
            } else {
                console.log(data);
            }
        })
        .error(function(data, status, headers, config) {
            console.log('ERROR automating stock');
        })
        .finally(function(){

            //If we are still automating (i.e. hasn't been stopped)
            if (automating === true){

                //Automate next stock until we've automated through automationCount
                if (automationCount < NUM_STOCKS_TO_AUTOMATE) {
                    automateNextStock();
                } else {
                    automating = false;
                    console.log('DONE automating stocks.\n');
                }
            }
        });
    }


    //-------------------- Public --------------------

    //Get the percent of automation completed
    function automationPercent() {
        var percent;
        var count = automationCount;
        if (count === null) {
            percent = 0;
        } else {
            var total = NUM_STOCKS_TO_AUTOMATE;
            percent = count / total * 100;
            percent = percent.toFixed(1);
        }
        return percent;
    }

    //Start automating stocks
    function automationStart() {
        if (automationCount === null || automationCount >= NUM_STOCKS_TO_AUTOMATE) {
            console.log('\nAutomating ('+NUM_STOCKS_TO_AUTOMATE+') stocks...');
            automationCount = 0;
        } else {
            console.log('Resuming automation...');
        }
        automating = true;
        automateNextStock();
    }

    //Stop automating stocks
    function automationStop() {
        automating = false;
        console.log('Automation stopped');
    }

    //the number of stocks that have been automated
    function getAutomationCount() {
        return automationCount;
    }

    //Is automation currently running
    function isAutomating() {
        return automating;
    }


    //--------------------  --------------------


     vm.NUM_STOCKS_TO_AUTOMATE = NUM_STOCKS_TO_AUTOMATE;
     vm.automationPercent = automationPercent;
     vm.automationStart = automationStart;
     vm.automationStop = automationStop;
     vm.getAutomationCount = getAutomationCount;
     vm.isAutomating = isAutomating;
}]);
