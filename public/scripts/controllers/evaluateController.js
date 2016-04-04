myApp.controller('EvaluateController', ['$scope', 'DataFactory', function($scope, DataFactory) {
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
