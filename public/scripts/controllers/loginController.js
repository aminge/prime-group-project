myApp.controller('LoginController', ['$scope', 'DataFactory', function($scope, DataFactory){
console.log('LoginController works');

  $scope.dataFactory = DataFactory;

  $scope.hideForm = $scope.dataFactory.factoryDisplayReminderMessage();

  //var alterView = function() {
  //  if
  //};

  $scope.backToForm = function() {
    $scope.hideForm = false;
  };

  console.log($scope.hideForm);

  $scope.loginUser = function() {

    var user = {
      email: $scope.email,
      password: $scope.password
    };

    $scope.dataFactory.factoryLoginUser(user);
  };
}]);