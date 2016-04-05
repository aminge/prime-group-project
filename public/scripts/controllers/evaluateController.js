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

  $scope.justNumber = function(str) {
    var output = '';
    for (var i = 0; i < str.length; i++) {
      // I should learn regular expressions
      if (str[i] == '.') {
        return parseInt(output);
      }
      else if (str[i] == '0' || str[i] == '1' || str[i] == '2' || str[i] == '3' || str[i] == '4' || str[i] == '5' || str[i] == '6' || str[i] == '7' || str[i] == '8' || str[i] == '9') {
        output += str[i];
      }
      return parseInt(output);
    }
  };

  $scope.justNumber2 = function(str) {
    return parseInt(str.split(/ /)[0].replace(/[^\d]/g, ''));
  };

  $scope.purchasePrice = 50000;                    // 1
  $scope.closingCosts = 1500;                      // 2
  $scope.holdingCosts = 1500;                      // 3
  $scope.includeCloseHoldCosts = true;             // 4
  $scope.rehabBudget = 20000;                      // 5
  $scope.projectRehabPeriod = 2;                   // 6
  $scope.financingUsed = true;                     // 7
  $scope.lenderAVRCostOfProject = 1;               // 8
  $scope.maxPercentOfCostFinanced = 90;            // 9
  $scope.originationDiscountPoints = 3;            // 10
  $scope.otherClosingCosts = 0;                    // 11
  $scope.pointsClosingCosts = 'backend';           // 12

  $scope.interestPaymentDuringRehab = 0;
  $scope.pointsClosingCosts = 1;
  $scope.splitBackendProfitsWithLender = 1;
  $scope.monthsCompleteSaleAfterRehab = 2;
  $scope.monthsToRentAfterRehab = 2;
  $scope.refinancePerm = true;
  $scope.amortizationYears = 20;

  $scope.doStuff = function() {
    console.log($scope.justNumber2($scope.purchasePrice));
  }

}])

// allow you to format a text input field.
// <input type="text" ng-model="test" format="number" />
// <input type="text" ng-model="test" format="currency" />
.directive('format', ['$filter', function ($filter) {
  return {
    require: '?ngModel',
    link: function (scope, elem, attrs, ctrl) {
      if (!ctrl) return;

      ctrl.$formatters.unshift(function (a) {
        return $filter(attrs.format)(ctrl.$modelValue)
      });

      elem.bind('blur', function(event) {
        var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
        elem.val($filter(attrs.format)(plainNumber));
      });
    }
  };
}]);
