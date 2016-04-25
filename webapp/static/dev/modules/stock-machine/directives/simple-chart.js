
//Directive for simple charts
angular.module('stockMachineApp').directive('simpleChart', [function() {
    'use strict';

    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '='
        },
        template: '' +
            '<div class="simple-chart">' +
            '   <div class="chart"></div>' +
            //'   <pre>{{ result | json}}</pre>' +
            '</div>',
        controller: ['$scope', '$element', function($scope, $element) {
            function convert(data) {
                var result = [];
                angular.forEach(data, function(val, key){
                    var num = val*1;
                    num = (angular.isNumber(num) && !isNaN(num) && num !== null) ? num : null;
                    result.push(num);
                });
                $scope.result = result;
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

            $scope.$watch('data', function(data){
                if (data) {
                    draw(data);
                }
            });
        }]
    };
}]);
