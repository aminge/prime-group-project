var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);

myApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/search', {
            templateUrl: '/views/templates/search.html',
            controller: 'SearchController'
        })
        .when('/mortgage', {
            templateUrl: '/views/templates/mortgage.html',
            controller: 'MortgageController'
        })
        .otherwise({
            redirectTo: 'search'
        });
}]);
