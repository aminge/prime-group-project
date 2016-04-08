myApp.controller('RegisterController', ['$scope', 'DataFactory', '$http', function($scope, DataFactory, $http){
  console.log('RegisterController works');

  $scope.dataFactory = DataFactory;

  $scope.validUser = true;

  $scope.addNewUser = function () {

    if ($scope.password != $scope.confirmPassword) {
      $scope.validUser = false;
      return false;
    } else {
      var user = {
        firstName: $scope.firstName,
        lastName: $scope.lastName,
        telNumber: $scope.telNumber,
        email: $scope.email,
        password: $scope.password
      };
      $scope.dataFactory.factoryAddNewUser(user);
    }

  }
}]);
