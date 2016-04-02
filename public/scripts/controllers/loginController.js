myApp.controller('LoginController', ['$scope', 'DataFactory', function($scope, DataFactory){
console.log('LoginController works');

  $scope.dataFactory = DataFactory;

  $scope.loginUser = function() {

    var user = {
      email: $scope.email,
      password: $scope.password
    };

    $scope.dataFactory.factoryLoginUser(user);
  };
}]);