myApp.controller('MortgageController', ['$scope', '$location', 'DataFactory', function($scope, $location, DataFactory) {

  // check to see if the user is logged in
  if (!DataFactory.factoryIsUserLoggedIn()) {
    // redirect to login and display message letting user know they have to log in to see the content
    DataFactory.factorySetReminderMessageToTrue();
    $location.path('./views/templates/login.html');
  }

  console.log('MortgageController works');
  $scope.dataFactory = DataFactory;

  $scope.calculateMortgage = function() {
    $scope.dataFactory.factoryCalculateMortgage(parseFloat($scope.price), $scope.years, $scope.interestRate);
  };


  $scope.calculateMortgage = function() {
    $scope.dataFactory.factoryCalculateMortgage(parseFloat($scope.price), $scope.years, $scope.interestRate);
    $scope.mortgage = $scope.dataFactory.factoryExportMortgage()
    console.log(mortgage);
  };





}]);
