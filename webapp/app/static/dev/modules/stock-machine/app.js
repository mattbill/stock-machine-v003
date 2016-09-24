
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
                template: '<analysis-page></analysis-page>'
            })
            .state('automate', {
                url: "/automate",
                template: '<automate-page></automate-page>'
            })
            .state('login', {
                url: "/login",
                template: '<login-page></login-page>'
            })
            .state('table', {
                url: "/table",
                template: '<datatable-page></datatable-page>'
            });
    }]);
