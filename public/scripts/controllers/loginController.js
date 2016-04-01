myApp.controller('LoginController', ['$scope', 'DataFactory', function($scope, DataFactory){
console.log('LoginController works');

  $scope.dataFactory = DataFactory;

  $scope.logInUser = function($event) {

    $http.post('/', $scope.formData).then(
      function (res) {
        $location.path('/search');
      },
      function (err) {
        $location.path('/failure');
      }
    );
    var user = {
      email: $scope.email,
      password: $scope.password
    }
  };
}]);