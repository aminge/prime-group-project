myApp.controller('EvaluateController', ['$scope', '$location', 'DataFactory', function($scope, $location, DataFactory) {

  // check to see if the user is logged in
  if (!DataFactory.factoryIsUserLoggedIn()) {
    // redirect to login and display message letting user know they have to log in to see the content
    DataFactory.factorySetReminderMessageToTrue();
    $location.path('./views/templates/login.html');
  }

  $scope.buyHoldForm = false;
  $scope.flipForm = true;
  $scope.financingUsed = true;


  $scope.viewFlip = function() {
    $scope.flipForm = true;
    $scope.buyHoldForm = false;
  };
  $scope.viewRent = function() {
    $scope.flipForm = false;
    $scope.buyHoldForm = true;
  };

  $scope.closingCosts = '1,500';

  $scope.model = {
    includeCloseHoldCosts: "1",
    projectRehabPeriod: "2",
    financingUsed: "1",
    lenderAVRCostOfProject: "1",
    interestPaymentDuringRehab: "0",
    pointsClosingCosts: "1",
    splitBackendProfitsWithLender: "1",
    monthsCompleteSaleAfterRehab: "2",
    monthsToRentAfterRehab: "2",
    refinancePerm: "true",
    amortizationYears: "20"
  };


  $scope.financingUsed = true;

}]);
