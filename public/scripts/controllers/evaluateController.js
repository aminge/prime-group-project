myApp.controller('EvaluateController', ['$scope', 'DataFactory', function($scope, DataFactory) {
  console.log('evaluate controller works');

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


}]);
