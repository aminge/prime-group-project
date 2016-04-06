myApp.controller('MortgageController', ['$scope', '$location', 'DataFactory', function($scope, $location, DataFactory) {

  //// check to see if the user is logged in
  //if (!DataFactory.factoryIsUserLoggedIn()) {
  //  // redirect to login and display message letting user know they have to log in to see the content
  //  DataFactory.factorySetReminderMessageToTrue();
  //  $location.path('./views/templates/login.html');
  //}
  console.log('MortgageController works');
  $scope.dataFactory = DataFactory;
  $scope.results = false;

  // use search results price for default mortgage price:
  $scope.price = $scope.dataFactory.factoryExportMortgagePrice();

  // use search results photo, if not exist use stock photo:
  $scope.housePhoto = $scope.dataFactory.factoryGetPhotos();
  console.log($scope.housePhoto);

  $scope.calculateMortgage = function() {
    $scope.dataFactory.factoryCalculateMortgage(parseFloat($scope.price), $scope.years, $scope.interestRate);
    $scope.monthlyPayments = $scope.dataFactory.factoryExportMortgage();
    $scope.totalCost = $scope.monthlyPayments * parseFloat($scope.years) * 12 ;
    $scope.results = true;
    $scope.price = '';
    $scope.interestRate = '';
    $scope.years = '';
  };






}]);