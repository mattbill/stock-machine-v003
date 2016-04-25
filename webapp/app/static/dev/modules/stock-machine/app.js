
angular
    .module('stockMachineApp', [
        'ui.bootstrap',
        'ui.router',
        'smart-table'
    ])
    .config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login");

        $stateProvider
            .state('analysis', {
                url: "/analysis",
                templateUrl: 'static/dev/modules/stock-machine/views/analysis.html',
                controller: 'analysisCtrl',
                controllerAs: 'vm'
            })
            .state('automate', {
                url: "/automate",
                templateUrl: 'static/dev/modules/stock-machine/views/automate.html',
                controller: 'automateCtrl',
                controllerAs: 'vm'
            })
            .state('login', {
                url: "/login",
                templateUrl: 'static/dev/modules/stock-machine/views/login.html',
                controller: 'loginCtrl',
                controllerAs: 'vm'
            })
            .state('table', {
                url: "/table",
                templateUrl: 'static/dev/modules/stock-machine/views/data-table.html',
                controller: 'dataTableCtrl',
                controllerAs: 'vm'
            });
    }]);
