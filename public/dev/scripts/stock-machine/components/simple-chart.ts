declare var $: any;
declare var angular: any;

angular.module('stockMachineApp').component('simpleChart', {
    bindings: {
        data: '='
    },
    templateUrl: '/scripts/stock-machine/components/simple-chart.html',
    controller: function($scope, $element) {
        var $ctrl = this;

        function convert(data) {
            var result = [];
            angular.forEach(data, function(val, key){
                var num = val*1;
                num = (angular.isNumber(num) && !isNaN(num) && num !== null) ? num : null;
                result.push(num);
            });
            return result;
        }

        function draw(data) {
            $element.find('.chart').highcharts({
                title: {
                    text: '',
                    style: {
                        display: 'none'
                    }
                },
                xAxis: {
                    labels: {
                        enabled: false
                    },
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    labels: {
                        enabled: false
                    },
                    title: {
                        text: null
                    }
                },
                legend: {
                    enabled: false
                },
                series: [{
                    connectNulls: true,
                    color: '#777',
                    data: convert(data)
                }],
                plotOptions: {
                    series: {
                        animation: false
                    }
                }
            });

            $('*[text-anchor="end"]').hide();
        }

        $scope.$watch('$ctrl.data', function(data){
            if (data) {
                draw(data);
            }
        });
    }
});
