myApp.controller('EvaluateController', ['$scope', '$location', 'DataFactory', function($scope, $location, DataFactory) {

  // check to see if the user is logged in
  //if (!DataFactory.factoryIsUserLoggedIn()) {
  //  // redirect to login and display message letting user know they have to log in to see the content
  //  DataFactory.factorySetReminderMessageToTrue();
  //  $location.path('./views/templates/login.html');
  //}

  $scope.dataFactory = DataFactory;

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

  // Default Values for Assumptions Inputs
  $scope.purchasePrice = 50000;                     // 1
  $scope.closingCosts = 1500;                       // 2
  $scope.holdingCosts = 1500;                       // 3
  $scope.includeCloseHoldCosts = 'yes';             // 4
  $scope.rehabBudget = 20000;                       // 5
  $scope.projectRehabPeriod = 2;                    // 6
  $scope.financingUsed = '1';                       // 7  (1 = true, 0 = false)
  $scope.lenderCapsARVorCost = 'cost';              // 8
  $scope.maxPercentOfCostFinanced = 90;             // 9
  $scope.originationDiscountPoints = 3;             // 10
  $scope.otherClosingCosts = 0;                     // 11
  $scope.pointsClosingCosts = 'upfront';            // 12
  $scope.interestRate = 10;                         // 13
  $scope.interestPaymentDuringRehab = 'yes';        // 14
  $scope.splitBackendProfitsWithLender = 'no';      // 15
  $scope.percentagePreTaxProfits = 50;              // 16

  // Default Values For Flip Analysis Inputs
  $scope.arvForFlip = 100000;                       // 17 This one could be purchase price + rehab budget
  $scope.monthsCompleteSaleAfterRehab = 2;          // 18
  $scope.projectedResalePrice = 100000;             // 27
  $scope.projectedCostSale = 7;                     // 28

  // Default Values for Hold/Rent Analysis
  $scope.arvForRent = 100000;                       // 32 This one could be purchase price + rehab budget
  $scope.monthsToRentAfterRehab = 2;                // 33
  $scope.projectedOperatingIncome = 1200;           // 42
  $scope.projectedOperatingExpenses = 260;          // 43
  $scope.refinancePerm = '1';                       // 45
  $scope.refiPercentARV = 85;                       // 46
  $scope.newMortgageRate = 7;                       // 47
  $scope.amortizationYears = 20;                    // 48
  $scope.refiDiscPtsMiscCosts = 3;                  // 49



  // things are getting converted to string, since the form type is text. I need to convert them back to integer

  $scope.updateTotalCapNeeded = function() {          // 19
    $scope.totalCapNeeded = $scope.internalPurchasePrice + $scope.internalHoldingCosts + $scope.internalClosingCosts + $scope.internalRehabBudget;
  };


  $scope.updateMaxDollarsFinanced = function() {      // 20

    if ($scope.lenderCapsARVorCost == 'arv') {
      $scope.maxDollarsFinanced = $scope.internalArvForFlip * $scope.internalMaxPercentOfCostFinanced / 100;
    } else if ($scope.lenderCapsARVorCost == 'cost') {
      $scope.maxDollarsFinanced = ($scope.internalPurchasePrice + $scope.internalRehabBudget) * $scope.internalMaxPercentOfCostFinanced / 100;
    }

    //console.log($scope.internalMaxPercentOfCostFinanced);
  };

  $scope.updateActualToBeFinanced = function() {       // 21
    if ($scope.lenderCapsARVorCost == 'arv') {
      $scope.actualToBeFinanced = Math.min($scope.internalArvForFlip * $scope.internalMaxPercentOfCostFinanced / 100,
                                           $scope.internalPurchasePrice + $scope.internalRehabBudget);
    } else if ($scope.lenderCapsARVorCost == 'cost') {
      //$scope.actualToBeFinanced = ($scope.internalPurchasePrice + $scope.internalRehabBudget) * $scope.internalMaxPercentOfCostFinanced / 100;
      $scope.actualToBeFinanced = Math.min($scope.internalPurchasePrice + $scope.internalRehabBudget, $scope.maxDollarsFinanced);
    }
  };

  $scope.updateClosingCostAddedToLoan = function() {
    if ($scope.financingUsed == '0') {
      $scope.closingCostAddedToLoan = 0;
    } else if ($scope.financingUsed == '1') {
      if ($scope.lenderCapsARVorCost == 'arv') { // it's the same either way
        $scope.closingCostAddedToLoan = $scope.internalClosingCosts + $scope.internalHoldingCosts;
      } else if ($scope.lenderCapsARVorCost == 'cost') {
        $scope.closingCostAddedToLoan = $scope.internalClosingCosts + $scope.internalHoldingCosts;
      }
    }
  };

  $scope.updateTotalLoanAmount = function() {
    $scope.totalLoanAmount = $scope.actualToBeFinanced + $scope.closingCostAddedToLoan;
  };

  $scope.updateCashRequiredOverLife = function() {

    if ($scope.financingUsed == '0') { // all cash
      $scope.cashRequiredOverLife = $scope.internalPurchasePrice + $scope.internalClosingCosts + $scope.internalHoldingCosts;
    } else if ($scope.financingUsed == '1') { // financing

      var totalMonths = $scope.internalProjectRehabPeriod + $scope.internalMonthsCompleteSaleAfterRehab;

      // Needs to take #10 and #11 into account, for both arv and cost
      if ($scope.lenderCapsARVorCost == 'arv') {
        $scope.cashRequiredOverLife = $scope.totalCapNeeded - $scope.totalLoanAmount + ($scope.totalLoanAmount * (totalMonths / 12) * ($scope.internalInterestRate / 100)) + ((($scope.internalOriginationDiscountPoints + $scope.internalOtherClosingCosts) / 100) * $scope.actualToBeFinanced);
      } else if ($scope.lenderCapsARVorCost == 'cost') {
        $scope.cashRequiredOverLife = $scope.totalCapNeeded - $scope.totalLoanAmount + ($scope.totalLoanAmount * (totalMonths / 12) * ($scope.internalInterestRate / 100)) + ((($scope.internalOriginationDiscountPoints + $scope.internalOtherClosingCosts) / 100) * $scope.actualToBeFinanced);
      }
    }

    //console.log('the amount is: ', ((($scope.internalOriginationDiscountPoints + $scope.internalOtherClosingCosts) / 100) * $scope.actualToBeFinanced));
    //console.log($scope.internalOriginationDiscountPoints + $scope.internalOtherClosingCosts, '%');
    //console.log('origination: ', $scope.internalOriginationDiscountPoints);
    //console.log('other: ', $scope.internalOtherClosingCosts);

    if ($scope.cashRequiredOverLife < 0) {
      $scope.cashRequiredOverLife = 0;
    }

    //console.log('cash required has been updated and is now: ', $scope.cashRequiredOverLife);
  };

  $scope.updateTotalCostEndOfRehab = function() {
    $scope.totalCostEndOfRehab = $scope.totalLoanAmount + $scope.cashRequiredOverLife;
  };

  $scope.updatePercentageOfArv = function() {
    $scope.percentageOfArv = Math.round($scope.totalCostEndOfRehab / $scope.internalArvForFlip * 100);
  };

  $scope.updateProjectedProfit = function() {
    var percentOfSale = (100 - $scope.internalProjectedCostSale) / 100;
    $scope.projectedProfit = ($scope.internalProjectedResalePrice * percentOfSale) - $scope.totalCostEndOfRehab; // i think i have to take this last /100 off
  };

  $scope.updateReturnOnCashInvested = function() {
    if ($scope.cashRequiredOverLife == 0) {
      $scope.returnOnCashInvested = 'Infinite';
    } else {
      $scope.returnOnCashInvested = $scope.projectedProfit / $scope.cashRequiredOverLife * 100;
    }
  };

  $scope.updateRoiAnnualized = function() {
    if ($scope.cashRequiredOverLife == 0) {
      $scope.returnOnCashInvested = 'Infinite';
    } else {
      var totalMonths = $scope.internalProjectRehabPeriod + $scope.internalMonthsCompleteSaleAfterRehab;
      $scope.roiAnnualized = Math.round($scope.returnOnCashInvested * 12 / totalMonths);
    }
  };

  $scope.updateTotalCapNeededHR = function() {
    $scope.totalCapNeededHR = $scope.purchasePrice + $scope.holdingCosts + $scope.closingCosts + $scope.rehabBudget;
  };

  $scope.updateMaxDollarsFinancedHR = function() {
    if ($scope.lenderCapsARVorCost == 'arv') {
      $scope.maxDollarsFinancedHR = $scope.internalArvForFlip * $scope.internalMaxPercentOfCostFinanced / 100;
    } else if ($scope.lenderCapsARVorCost == 'cost') {
      $scope.maxDollarsFinancedHR = ($scope.internalPurchasePrice + $scope.internalRehabBudget) * $scope.internalMaxPercentOfCostFinanced / 100;
    }
  };

  $scope.updateEverything = function() {
    $scope.internalPurchasePrice = parseFloat($scope.purchasePrice);                                   // 1
    $scope.internalClosingCosts = parseFloat($scope.closingCosts);                                     // 2
    $scope.internalHoldingCosts = parseFloat($scope.holdingCosts);                                     // 3
    $scope.internalRehabBudget = parseFloat($scope.rehabBudget);                                       // 5

    $scope.internalProjectRehabPeriod = parseFloat($scope.projectRehabPeriod);                         // 6
    $scope.internalMaxPercentOfCostFinanced = parseFloat($scope.maxPercentOfCostFinanced);             // 9
    $scope.internalOriginationDiscountPoints = parseFloat($scope.originationDiscountPoints);           // 10
    $scope.internalOtherClosingCosts = parseFloat($scope.otherClosingCosts);                           // 11
    $scope.internalInterestRate = parseFloat($scope.interestRate);                                     // 13
    //$scope.internalPercentagePreTaxProfits = parseFloat($scope.percentagePreTaxProfits);               // 16
    $scope.internalArvForFlip = parseFloat($scope.arvForFlip);                                         // 17
    $scope.internalMonthsCompleteSaleAfterRehab = parseFloat($scope.monthsCompleteSaleAfterRehab);     // 18

    $scope.internalProjectedResalePrice = parseFloat($scope.projectedResalePrice);                     // 27
    $scope.internalProjectedCostSale = parseFloat($scope.projectedCostSale);                           // 28

    $scope.internalArvForRent = parseFloat($scope.arvForRent);                                         // 32
    $scope.internalMonthsToRentAfterRehab = parseFloat($scope.monthsToRentAfterRehab);                 // 33
    $scope.internalProjectedOperatingIncome = parseFloat($scope.projectedOperatingIncome);             // 42
    $scope.internalProjectedOperatingExpenses = parseFloat($scope.projectedOperatingExpenses);         // 43
    $scope.internalRefiPercentARV = parseFloat($scope.refiPercentARV);                                 // 46
    $scope.internalNewMortgageRate = parseFloat($scope.newMortgageRate);                               // 47
    $scope.internalAmortizationYears = parseFloat($scope.amortizationYears);                           // 48
    $scope.internalRefiDiscPtsMiscCosts = parseFloat($scope.refiDiscPtsMiscCosts);                     // 49

    if (!$scope.internalPurchasePrice) { // 1
      $scope.internalPurchasePrice = 0;
    }
    if (!$scope.internalClosingCosts) { // 2
      $scope.internalClosingCosts = 0;
    }
    if (!$scope.internalHoldingCosts) { //3
      $scope.internalHoldingCosts = 0;
    }
    if (!$scope.internalRehabBudget) { // 5
      $scope.internalRehabBudget = 0;
    }
    if (!$scope.internalProjectRehabPeriod) { // 6
      $scope.internalProjectRehabPeriod = 0;
    }
    if (!$scope.internalMaxPercentOfCostFinanced) { // 9
      $scope.internalMaxPercentOfCostFinanced = 0;
    }
    if (!$scope.internalOriginationDiscountPoints) { // 10
      $scope.internalOriginationDiscountPoints = 0;
    }
    if (!$scope.internalOtherClosingCosts) { // 11
      $scope.internalOtherClosingCosts = 0;
      console.log('yo yo yo');
      console.log('InternalOtherClosingCosts is: ', $scope.internalOtherClosingCosts);  // why isn't this getting executed?????
    }
    if (!$scope.internalInterestRate) { // 13
      $scope.internalInterestRate = 0;
    }
    if (!$scope.internalArvForFlip) { // 17
      $scope.internalArvForFlip = 0;
    }
    if (!$scope.internalMonthsCompleteSaleAfterRehab) { // 18
      $scope.internalMonthsCompleteSaleAfterRehab = 0;
    }
    if (!$scope.internalProjectedResalePrice) { // 27
      $scope.internalProjectedResalePrice = 0;
    }
    if (!$scope.internalProjectedCostSale) { // 28
      $scope.internalProjectedCostSale = 0;
    }
    if (!$scope.internalArvForRent) { // 32
      $scope.internalArvForRent = 0;
    }
    if (!$scope.internalMonthsToRentAfterRehab) { // 33
      $scope.internalMonthsToRentAfterRehab = 0;
    }
    if (!$scope.internalProjectedOperatingIncome) { // 42
      $scope.internalProjectedOperatingIncome = 0;
    }
    if (!$scope.internalProjectedOperatingExpenses) { // 43
      $scope.internalProjectedOperatingExpenses = 0;
    }
    if (!$scope.internalRefiPercentARV) { // 46
      $scope.internalRefiPercentARV = 0;
    }
    if (!$scope.internalNewMortgageRate) { // 47
      $scope.internalNewMortgageRate = 0;
    }
    if (!$scope.internalAmortizationYears) { // 48   *** This one might have to change because 'Interest Only' is an option
      $scope.internalAmortizationYears = 0;
    }
    if (!$scope.internalRefiDiscPtsMiscCosts) { // 49
      $scope.internalRefiDiscPtsMiscCosts = 0;
    }

    console.log('InternalOtherClosingCosts is: ', $scope.internalOtherClosingCosts);

    $scope.updateMaxDollarsFinanced();
    $scope.updateTotalCapNeeded();
    $scope.updateActualToBeFinanced();
    $scope.updateClosingCostAddedToLoan();
    $scope.updateTotalLoanAmount();
    $scope.updateCashRequiredOverLife();
    $scope.updateTotalCostEndOfRehab();
    $scope.updatePercentageOfArv();
    $scope.updateProjectedProfit();
    $scope.updateReturnOnCashInvested();
    $scope.updateRoiAnnualized();


    console.log('updating everything');
  };

  $scope.updateEverything();

  //$scope.pointsClosingCosts = 1;
  //$scope.monthsCompleteSaleAfterRehab = 2;
  //$scope.monthsToRentAfterRehab = 2;
  //$scope.refinancePerm = true;
  //$scope.amortizationYears = 20;

  //$scope.doStuff = function() {
  //  console.log($scope.justNumber($scope.purchasePrice));
  //}
}]);

String.prototype.splice = function(idx, rem, s) {
  return (this.slice(0, idx) + s + this.slice(idx + Math.abs(rem)));
};