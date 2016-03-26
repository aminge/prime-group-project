var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

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
        .when('/admin', {
            templateUrl: '/views/templates/admin.html',
            controller: 'AdminController'
        })
        .when('/evaluate', {
            templateURL: 'views/templates/evaluate.html',
            controller: 'EvaluateController'
        })
        .when('/favorites', {
            templateURL: 'views/templates/favorites.html',
            controller: 'FavoritesController'
        })
        .when('/login', {
            templateURL: 'views/templates/login.html',
            controller: 'LoginController'
        })
        .when('/logout', {
            templateURL: 'views/templates/logout.html',
            controller: 'LogoutController'
        })
        .when('/register', {
            templateURL: 'views/templates/register.html',
            controller: 'RegisterController'
        })
        .when('/resources', {
            templateURL: 'views/templates/resources.html',
            controller: 'ResourcesController'
        })
        .otherwise({
            redirectTo: 'search'
        });
}]);
