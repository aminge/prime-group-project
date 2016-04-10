myApp.controller('LoginController', ['$scope', 'DataFactory', '$http', function($scope, DataFactory, $http){
console.log('LoginController works');
  $scope.dataFactory = DataFactory;

  $scope.hideForm = $scope.dataFactory.factoryDisplayReminderMessage();

  $scope.failedLogin = false;

  $scope.backToForm = function() {
    $scope.hideForm = false;
  };

  //console.log($scope.hideForm);

  $scope.loginUser = function() {

    if (!$scope.email || !$scope.password) {
      // do stuff to prevent the user from logging in
      $scope.failedLogin = true;
      return
    }

    var user = {
      email: $scope.email,
      password: $scope.password
    };

    $scope.failedLogin = false;

    $scope.dataFactory.factoryLoginUser(user).then($scope.dataFactory.factoryUpdateUser(user));
  };


  //links to the sendgrid function
  $scope.sendEmail = function() {
    $http.post("/email").then(function(response) {
    });
  }
}]);
