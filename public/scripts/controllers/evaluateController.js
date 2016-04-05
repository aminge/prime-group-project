myApp.controller('EvaluateController', ['$scope', '$location', 'DataFactory', function($scope, $location, DataFactory) {

  // check to see if the user is logged in
  if (!DataFactory.factoryIsUserLoggedIn()) {
    // redirect to login and display message letting user know they have to log in to see the content
    DataFactory.factorySetReminderMessageToTrue();
    $location.path('./views/templates/login.html');
  }

  $scope.buyHoldForm = false;
  $scope.flipForm = true;

  $scope.viewFlip = function() {
    $scope.flipForm = true;
    $scope.buyHoldForm = false;
  };
  $scope.viewRent = function() {
    $scope.flipForm = false;
    $scope.buyHoldForm = true;
  };

  $scope.closingCosts = 1500;
  $scope.holdingCosts = 1500;
  $scope.financingUsed = true;

  $scope.includeCloseHoldCosts = 1;
  $scope.projectRehabPeriod = 2;
  $scope.financingUsed = 1;
  $scope.lenderAVRCostOfProject = 1;
  $scope.interestPaymentDuringRehab = 0;
  $scope.pointsClosingCosts = 1;
  $scope.splitBackendProfitsWithLender = 1;
  $scope.monthsCompleteSaleAfterRehab = 2;
  $scope.monthsToRentAfterRehab = 2;
  $scope.refinancePerm = true;
  $scope.amortizationYears = 20;



}]);
