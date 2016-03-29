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

  $scope.model = {
    includeCloseHoldCosts: "1",
    projectRehabPeriod: "2",
    financingUsed: "1",
    lenderAVRCostOfProject: "1"
  };


}]);
