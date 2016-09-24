

//Automation page
angular.module('stockMachineApp').component('automatePage', {
    templateUrl: 'static/dev/modules/stock-machine/views/automate.html',
    bindings: {},
    controller: function($http) {
        'use strict';
        var $ctrl = this;


        // PRIVATE

        var NUM_STOCKS_TO_AUTOMATE = 500,
            automationCount = null,
            automating = false;

        function automateNextStock() {
            automationCount++;
            console.log(automationCount + ': Automating stock');

            $http.get('api/stocks/automate/')
                .success(function (data, status, headers, config) {
                    if (typeof data === 'string' && data.match(/error/gi)) {
                        console.error(data);
                    } else {
                        console.log(data);
                    }
                })
                .error(function (data, status, headers, config) {
                    console.log('ERROR automating stock');
                })
                .finally(function () {

                    //If we are still automating (i.e. hasn't been stopped)
                    if (automating === true) {

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


        // PRIVATE

        function automationStart() {
            if (automationCount === null || automationCount >= NUM_STOCKS_TO_AUTOMATE) {
                console.log('\nAutomating (' + NUM_STOCKS_TO_AUTOMATE + ') stocks...');
                automationCount = 0;
            } else {
                console.log('Resuming automation...');
            }
            automating = true;
            automateNextStock();
        }

        function automationStop() {
            automating = false;
            console.log('Automation stopped');
        }

        function getAutomationCount() {
            return automationCount;
        }

        function getAutomationPercent() {
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

        function isAutomating() {
            return automating;
        }


        $ctrl.NUM_STOCKS_TO_AUTOMATE = NUM_STOCKS_TO_AUTOMATE;
        $ctrl.automationStart = automationStart;
        $ctrl.automationStop = automationStop;
        $ctrl.getAutomationCount = getAutomationCount;
        $ctrl.getAutomationPercent = getAutomationPercent;
        $ctrl.isAutomating = isAutomating;
    }
});
