myApp.controller('AdminController', ['$scope', 'DataFactory', '$http', function($scope, DataFactory, $http){
console.log('admin controller works');
$scope.users = [];

$http.get('/getUsers').then(function(response){
          $scope.users = response.data;
          console.log($scope.users);
        }
      );

}]);
