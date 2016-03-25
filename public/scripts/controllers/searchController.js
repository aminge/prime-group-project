myApp.controller('SearchController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {
console.log('SearchController working');
$scope.dataFactory = DataFactory;


}]);
