
angular
    .module('stockMachineApp', [
        'ui.bootstrap',
        'ui.router',
        'ui.sortable',
        'smart-table'
    ])
    .config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login");

        $stateProvider
            .state('analysis', {
                url: "/analysis",
                templateUrl: 'static/dev/modules/stock-machine/views/analysis.html',
                controller: 'AnalysisCtrl',
                controllerAs: '$ctrl'
            })
            .state('automate', {
                url: "/automate",
                templateUrl: 'static/dev/modules/stock-machine/views/automate.html',
                controller: 'AutomateCtrl',
                controllerAs: '$ctrl'
            })
            .state('login', {
                url: "/login",
                templateUrl: 'static/dev/modules/stock-machine/views/login.html',
                controller: 'LoginCtrl',
                controllerAs: '$ctrl'
            })
            .state('table', {
                url: "/table",
                templateUrl: 'static/dev/modules/stock-machine/views/data-table.html',
                controller: 'dataTableCtrl',
                controllerAs: '$ctrl'
            });
    }]);
