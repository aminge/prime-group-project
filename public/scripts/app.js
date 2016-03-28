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
            templateUrl: 'views/templates/evaluate.html',
            controller: 'EvaluateController'
        })
        .when('/favorites', {
            templateUrl: 'views/templates/favorites.html',
            controller: 'FavoritesController'
        })
        .when('/login', {
            templateUrl: 'views/templates/login.html',
            controller: 'LoginController'
        })
        .when('/logout', {
            templateUrl: 'views/templates/logout.html',
            controller: 'LogoutController'
        })
        .when('/register', {
            templateUrl: 'views/templates/register.html',
            controller: 'RegisterController'
        })
        .when('/resources', {
            templateUrl: 'views/templates/resources.html',
            controller: 'ResourcesController'
        })
        .otherwise({
            redirectTo: 'search'
        });
}]);
