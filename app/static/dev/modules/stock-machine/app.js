
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
                template: '<analysis></analysis>'
            })
            .state('automate', {
                url: "/automate",
                template: '<automate></automate>'
            })
            .state('login', {
                url: "/login",
                template: '<login></login>'
            })
            .state('datatable', {
                url: "/datatable",
                template: '<datatable></datatable>'
            });
    }]);
