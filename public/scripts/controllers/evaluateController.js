myApp.controller('EvaluateController', ['$scope', '$location', 'DataFactory', function($scope, $location, DataFactory) {

  // check to see if the user is logged in
  //if (!DataFactory.factoryIsUserLoggedIn()) {
  //  // redirect to login and display message letting user know they have to log in to see the content
  //  DataFactory.factorySetReminderMessageToTrue();
  //  $location.path('./views/templates/login.html');
  //}

  $scope.buyHoldForm = false;
  $scope.flipForm = true;
  $scope.financingUsed = true;
  $scope.currencyVal;


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
    }
    return parseInt(output);
  };

  $scope.justNumber2 = function(str) {
    return parseInt(str.split(/ /)[0].replace(/[^\d]/g, ''));
  };

  // Default Values for Assumptions Inputs
  $scope.purchasePrice = 50000;                     // 1
  $scope.closingCosts = 1500;                       // 2
  $scope.holdingCosts = 1500;                       // 3
  $scope.includeCloseHoldCosts = true;              // 4
  $scope.rehabBudget = 20000;                       // 5
  $scope.projectRehabPeriod = 2;                    // 6
  $scope.financingUsed = '1';                       // 7  (1 = true, 0 = false)
  $scope.lenderAVRCostOfProject = 'cost';           // 8
  $scope.maxPercentOfCostFinanced = 90;             // 9
  $scope.originationDiscountPoints = 3;             // 10
  $scope.otherClosingCosts = 0;                     // 11
  $scope.pointsClosingCosts = 'backend';            // 12
  $scope.interestRate = 10;                         // 13
  $scope.interestPaymentDuringRehab = true;         // 14
  $scope.splitBackendProfitsWithLender = true;      // 15
  $scope.percentagePreTaxProfits = 50;              // 16

  // Default Values For Flip Analysis Inputs
  $scope.arvForFlip = 100000;                       // 17 This one could be purchase price + rehab budget
  $scope.monthsCompleteSaleAfterRehab = 2;          // 18
  $scope.projectedResalePrice = 100000;             // 27
  $scope.projectedCostSale = 7;                     // 28

  // Default Values for Hold/Rent Analysis
  $scope.internalArvForRent = 100000;               // 32 This one could be purchase price + rehab budget
  $scope.internalMonthsToRentAfterRehab = 2;        // 33

  $scope.totalCapNeeded = $scope.purchasePrice + $scope.holdingCosts + $scope.closingCosts + $scope.rehabBudget;
  //$scope.
  //$scope.
  //$scope.
  //$scope.
  //$scope.
  //$scope.
  //$scope.
  //$scope.
  //$scope.
  //$scope.
  //$scope.

  // things are getting converted to string, since the form type is text. I need to convert them back to integer

  $scope.updateMaxDollarsFinanced = function() {

    if ($scope.lenderAVRCostOfProject == 'arv') {
      $scope.maxDollarsFinanced = $scope.arvForFlip * $scope.maxPercentOfCostFinanced / 100;
      console.log('lenderAVRCostOfProject is ', $scope.lenderAVRCostOfProject);
    } else if ($scope.lenderAVRCostOfProject == 'cost') {
      console.log('purchase price: ', $scope.purchasePrice);
      console.log('rehab budget ', $scope.rehabBudget);
      console.log('max percent ', $scope.maxPercentOfCostFinanced);
      $scope.maxDollarsFinanced = ($scope.purchasePrice + $scope.rehabBudget) * $scope.maxPercentOfCostFinanced / 100;
      console.log('lenderAVRCostOfProject is ', $scope.lenderAVRCostOfProject);
    }
    console.log($scope.maxDollarsFinanced);
  };

  $scope.updateEverything = function() {
    $scope.internalPurchasePrice = parseFloat($scope.purchasePrice);                                   // 1
    $scope.internalClosingCosts = parseFloat($scope.closingCosts);                                     // 2
    $scope.internalHoldingCosts = parseFloat($scope.holdingCosts);                                     // 3
    $scope.internalRehabBudget = parseFloat($scope.internalRehabBudget);                               // 5
    $scope.internalProjectRehabPeriod = parseFloat($scope.projectRehabPeriod);                         // 6
    $scope.internalMaxPercentOfCostFinanced = parseFloat($scope.maxPercentOfCostFinanced);             // 9
    $scope.internalOriginationDiscountPoints = parseFloat($scope.originationDiscountPoints);           // 10
    $scope.internalOtherClosingCosts = parseFloat($scope.originationDiscountPoints);                   // 11
    $scope.internalInterestRate = parseFloat($scope.interestRate);                                     // 13
    $scope.internalPercentagePreTaxProfits = parseFloat($scope.percentagePreTaxProfits);               // 16
    $scope.internalArvForFlip = parseFloat($scope.arvForFlip);                                         // 17
    $scope.internalMonthsCompleteSaleAfterRehab = parseFloat($scope.monthsCompleteSaleAfterRehab);     // 18

    $scope.internalProjectedResalePrice = parseFloat($scope.projectedResalePrice);                     // 27
    $scope.internalProjectedCostSale = parseFloat($scope.projectedCostSale);                           // 28

    $scope.internalArvForRent = parseFloat($scope.arvForRent);                                         // 32
    $scope.internalMonthsToRentAfterRehab = parseFloat($scope.monthsToRentAfterRehab)                  // 33



    $scope.updateMaxDollarsFinanced();
    console.log('updating errything');
  };


  $scope.pointsClosingCosts = 1;
  $scope.monthsCompleteSaleAfterRehab = 2;
  $scope.monthsToRentAfterRehab = 2;
  $scope.refinancePerm = true;
  $scope.amortizationYears = 20;

  $scope.doStuff = function() {
    console.log($scope.justNumber($scope.purchasePrice));
  }
}]);

String.prototype.splice = function(idx, rem, s) {
  return (this.slice(0, idx) + s + this.slice(idx + Math.abs(rem)));
};

//
//// allow you to format a text input field.
//// <input type="text" ng-model="test" format="number" />
//// <input type="text" ng-model="test" format="currency" />
//.directive('format', ['$filter', function ($filter) {
//  return {
//    require: '?ngModel',
//    link: function (scope, elem, attrs, ctrl) {
//      if (!ctrl) return;
//
//      ctrl.$formatters.unshift(function (a) {
//        return $filter(attrs.format)(ctrl.$modelValue)
//      });
//
//      elem.bind('blur', function(event) {
//        var plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
//        elem.val($filter(attrs.format)(plainNumber));
//      });
//    }
//  };
//}]);

// Works


//myApp.directive('currencyInput', function() {
//    return {
//      restrict: 'A',
//      scope: {
//        field: '='
//      },
//      replace: true,
//      template: '<span><input type="text" ng-model="field" />{{field}}</span>',
//      link: function($scope, $element, $attrs) {
//        $element.bind('keyup', function(e) {
//          var input = element.find('input');
//          var inputVal = input.val();
//
//          //clearing left side zeros
//          while ($scope.field.charAt(0) == '0') {
//            $scope.field = $scope.field.substr(1);
//          }
//
//          $scope.field = scope.field.replace(/[^\d.\',']/g, '');
//
//          var point = $scope.field.indexOf(".");
//          if (point >= 0) {
//            $scope.field = $scope.field.slice(0, point + 3);
//          }
//
//          var decimalSplit = $scope.field.split(".");
//          var intPart = decimalSplit[0];
//          var decPart = decimalSplit[1];
//
//          intPart = intPart.replace(/[^\d]/g, '');
//          if (intPart.length > 3) {
//            var intDiv = Math.floor(intPart.length / 3);
//            while (intDiv > 0) {
//              var lastComma = intPart.indexOf(",");
//              if (lastComma < 0) {
//                lastComma = intPart.length;
//              }
//
//              if (lastComma - 3 > 0) {
//                intPart = intPart.splice(lastComma - 3, 0, ",");
//              }
//              intDiv--;
//            }
//          }
//
//          if (decPart === undefined) {
//            decPart = "";
//          }
//          else {
//            decPart = "." + decPart;
//          }
//          var res = intPart + decPart;
//
//          $scope.$apply(function() {$scope.field = res});
//
//        });
//
//      }
//    };
//  });
