var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap']);

myApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: '',
            controller: ''
        })
        .otherwise({
            redirectTo: ''
        });
}]);
