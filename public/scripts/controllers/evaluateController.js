myApp.controller('EvaluateController', ['$scope', '$location', 'DataFactory', function($scope, $location, DataFactory) {

  // check to see if the user is logged in
  if (!DataFactory.factoryIsUserLoggedIn()) {
    // redirect to login and display message letting user know they have to log in to see the content
    DataFactory.factorySetReminderMessageToTrue();
    $location.path('./views/templates/login.html');
  }

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
  $scope.purchasePrice = $scope.dataFactory.factoryExportPrice();   // 1
  $scope.closingCosts = 1500;                                       // 2
  $scope.holdingCosts = 1500;                                       // 3
  $scope.includeCloseHoldCosts = 'yes';                             // 4
  $scope.rehabBudget = 20000;                                       // 5
  $scope.projectRehabPeriod = 2;                                    // 6
  $scope.financingUsed = '1';                                       // 7  (1 = true, 0 = false)
  $scope.lenderCapsARVorCost = 'cost';                              // 8
  $scope.maxPercentOfCostFinanced = 90;                             // 9
  $scope.originationDiscountPoints = 3;                             // 10
  $scope.otherClosingCosts = 0;                                     // 11
  $scope.pointsClosingCosts = 'upfront';                            // 12
  $scope.interestRate = 10;                                         // 13
  $scope.interestPaymentDuringRehab = 'yes';                        // 14
  //$scope.splitBackendProfitsWithLender = 'no';                      // 15
  //$scope.percentagePreTaxProfits = 50;                              // 16

  // Default Values For Flip Analysis Inputs
  $scope.arvForFlip = 100000;                       // 17 This one could be purchase price + 2 * rehab budget
  $scope.monthsCompleteSaleAfterRehab = 2;          // 18
  $scope.projectedResalePrice = 100000;             // 27
  $scope.projectedCostSale = 7;                     // 28

  // Default Values for Hold/Rent Analysis
  $scope.arvForRentHR = 100000;                     // 32 This one could be purchase price + 2 * rehab budget
  $scope.monthsToRentAfterRehabHR = 2;              // 33
  $scope.projectedOperatingIncomeHR = 1200;         // 42
  $scope.projectedOperatingExpensesHR = 260;        // 43
  $scope.refinancePermHR = 'yes';                   // 45
  $scope.refiPercentARVHR = 85;                     // 46
  $scope.newMortgageRateHR = 7;                     // 47
  $scope.amortizationYearsHR = 20;                  // 48
  $scope.refiDiscPtsMiscCostsHR = 3;                // 49



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

    if ($scope.cashRequiredOverLife < 0) {
      $scope.cashRequiredOverLife = 0;
    }
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
      $scope.maxDollarsFinancedHR = $scope.internalArvForRentHR * $scope.internalMaxPercentOfCostFinanced / 100;
    } else if ($scope.lenderCapsARVorCost == 'cost') {
      $scope.maxDollarsFinancedHR = ($scope.internalPurchasePrice + $scope.internalRehabBudget) * $scope.internalMaxPercentOfCostFinanced / 100;
    }
  };

  $scope.updateActualToBeFinancedHR = function() {
    if ($scope.lenderCapsARVorCost == 'arv') {
      $scope.actualToBeFinancedHR = Math.min($scope.internalArvForRentHR * $scope.internalMaxPercentOfCostFinanced / 100,
        $scope.internalPurchasePrice + $scope.internalRehabBudget);
    } else if ($scope.lenderCapsARVorCost == 'cost') {
      $scope.actualToBeFinancedHR = Math.min($scope.internalPurchasePrice + $scope.internalRehabBudget, $scope.maxDollarsFinancedHR);
    }
  };

  $scope.updateClosingCostAddedToLoanHR = function() {
    if ($scope.financingUsed == '0') {
      $scope.closingCostAddedToLoanHR = 0;
    } else if ($scope.financingUsed == '1') {
      if ($scope.lenderCapsARVorCost == 'arv') { // it's the same either way
        $scope.closingCostAddedToLoanHR = $scope.internalClosingCosts + $scope.internalHoldingCosts;
      } else if ($scope.lenderCapsARVorCost == 'cost') {
        $scope.closingCostAddedToLoanHR = $scope.internalClosingCosts + $scope.internalHoldingCosts;
      }
    }
  };

  $scope.updateTotalLoanAmountHR = function() {
    $scope.totalLoanAmountHR = $scope.actualToBeFinancedHR + $scope.closingCostAddedToLoanHR;
  };

  $scope.updateCashRequiredHR = function() {
    if ($scope.financingUsed == '0') { // all cash
      $scope.cashRequiredHR = $scope.internalPurchasePrice + $scope.internalClosingCosts + $scope.internalHoldingCosts;
    } else if ($scope.financingUsed == '1') { // financing

      var totalMonths = $scope.internalProjectRehabPeriod + $scope.internalMonthsToRentAfterRehabHR;

      // Needs to take #10 and #11 into account, for both arv and cost
      if ($scope.lenderCapsARVorCost == 'arv') {
        $scope.cashRequiredHR = $scope.totalCapNeededHR - $scope.totalLoanAmountHR + ($scope.totalLoanAmountHR * (totalMonths / 12) * ($scope.internalInterestRate / 100)) + ((($scope.internalOriginationDiscountPoints + $scope.internalOtherClosingCosts) / 100) * $scope.actualToBeFinancedHR);
      } else if ($scope.lenderCapsARVorCost == 'cost') {
        $scope.cashRequiredHR = $scope.totalCapNeededHR - $scope.totalLoanAmountHR + ($scope.totalLoanAmountHR * (totalMonths / 12) * ($scope.internalInterestRate / 100)) + ((($scope.internalOriginationDiscountPoints + $scope.internalOtherClosingCosts) / 100) * $scope.actualToBeFinancedHR);
      }
    }

    if ($scope.cashRequiredHR < 0) {
      $scope.cashRequiredHR = 0;
    }
  };

  $scope.updateAllInCostHR = function() {
    $scope.allInCostHR = $scope.totalLoanAmountHR + $scope.cashRequiredHR;
  };

  $scope.updatePercentOfArvHR = function() {
    $scope.percentOfArvHR = $scope.allInCostHR / $scope.internalArvForRentHR * 100;
  };

  $scope.updateNetOperatingIncomeHR = function() {
    $scope.netOperatingIncomeHR = $scope.internalProjectedOperatingIncomeHR - $scope.internalProjectedOperatingExpensesHR;
  };

  $scope.updateNewMortgagePaymentHR = function() {
    $scope.newMortgagePaymentHR = $scope.dataFactory.factoryCalculateMortgage($scope.internalArvForRentHR * $scope.internalRefiPercentARVHR / 100, $scope.internalAmortizationYearsHR, $scope.internalNewMortgageRateHR)
  };

  $scope.updateRefiLoanAmountHR = function() {
    $scope.refiLoanAmountHR = $scope.internalArvForRentHR * $scope.internalRefiPercentARVHR / 100;
  };

  $scope.updateCashOutRefiHR = function() {
    // 1, 2, 3, 8, 9, 32, 46, 49
    //$scope.cashOutRefiHR = ($scope.refiLoanAmountHR * (100 - $scope.refiDiscPtsMiscCostsHR)) - $scope.totalLoanAmountHR - $scope.internalClosingCosts - $scope.internalHoldingCosts;
    $scope.cashOutRefiHR = $scope.refiLoanAmountHR * ($scope.internalRefiPercentARVHR / 100) * (1 - ($scope.internalRefiDiscPtsMiscCostsHR / 100)) - $scope.totalLoanAmountHR;
    console.log($scope.cashOutRefiHR);
  };

  $scope.updateProfitRefiHR = function() {
    // **********
  };

  $scope.updateRoiOnCashInvestedHR = function() {
    // **********
  };

  $scope.updateOrgMoneyTiedUpRefiHR = function() {
    // **********
  };

  $scope.updateEquityLeftRefiHR = function() {
    // **********
  };

  $scope.updateCashFlowPreTaxHR = function() {
    // **********
  };

  $scope.updateCashOnCashHR = function() {
    // **********
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
    //$scope.internalPercentagePreTaxProfits = parseFloat($scope.percentagePreTaxProfits);             // 16  not needed anymore
    $scope.internalArvForFlip = parseFloat($scope.arvForFlip);                                         // 17
    $scope.internalMonthsCompleteSaleAfterRehab = parseFloat($scope.monthsCompleteSaleAfterRehab);     // 18

    $scope.internalProjectedResalePrice = parseFloat($scope.projectedResalePrice);                     // 27
    $scope.internalProjectedCostSale = parseFloat($scope.projectedCostSale);                           // 28

    $scope.internalArvForRentHR = parseFloat($scope.arvForRentHR);                                     // 32
    $scope.internalMonthsToRentAfterRehabHR = parseFloat($scope.monthsToRentAfterRehabHR);             // 33
    $scope.internalProjectedOperatingIncomeHR = parseFloat($scope.projectedOperatingIncomeHR);         // 42
    $scope.internalProjectedOperatingExpensesHR = parseFloat($scope.projectedOperatingExpensesHR);     // 43
    $scope.internalRefiPercentARVHR = parseFloat($scope.refiPercentARVHR);                             // 46
    $scope.internalNewMortgageRateHR = parseFloat($scope.newMortgageRateHR);                           // 47
    $scope.internalAmortizationYearsHR = parseFloat($scope.amortizationYearsHR);                       // 48
    $scope.internalRefiDiscPtsMiscCostsHR = parseFloat($scope.refiDiscPtsMiscCostsHR);                 // 49

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
    if (!$scope.internalArvForRentHR) { // 32
      $scope.internalArvForRentHR = 0;
    }
    if (!$scope.internalMonthsToRentAfterRehabHR) { // 33
      $scope.internalMonthsToRentAfterRehabHR = 0;
    }
    if (!$scope.internalProjectedOperatingIncomeHR) { // 42
      $scope.internalProjectedOperatingIncomeHR = 0;
    }
    if (!$scope.internalProjectedOperatingExpensesHR) { // 43
      $scope.internalProjectedOperatingExpensesHR = 0;
    }
    if (!$scope.internalRefiPercentARVHR) { // 46
      $scope.internalRefiPercentARVHR = 0;
    }
    if (!$scope.internalNewMortgageRateHR) { // 47
      $scope.internalNewMortgageRateHR = 0;
    }
    if (!$scope.internalAmortizationYearsHR) { // 48   *** This one might have to change because 'Interest Only' is an option
      $scope.internalAmortizationYearsHR = 0;
    }
    if (!$scope.internalRefiDiscPtsMiscCostsHR) { // 49
      $scope.internalRefiDiscPtsMiscCostsHR = 0;
    }

    //console.log('InternalOtherClosingCosts is: ', $scope.internalOtherClosingCosts);

    $scope.updateTotalCapNeeded();            // 19
    $scope.updateMaxDollarsFinanced();        // 20
    $scope.updateActualToBeFinanced();        // 21
    $scope.updateClosingCostAddedToLoan();    // 22
    $scope.updateTotalLoanAmount();           // 23
    $scope.updateCashRequiredOverLife();      // 24
    $scope.updateTotalCostEndOfRehab();       // 25
    $scope.updatePercentageOfArv();           // 26
    $scope.updateProjectedProfit();           // 29
    $scope.updateReturnOnCashInvested();      // 30
    $scope.updateRoiAnnualized();             // 31

    $scope.updateTotalCapNeededHR();          // 34
    $scope.updateMaxDollarsFinancedHR();      // 35
    $scope.updateActualToBeFinancedHR();      // 36
    $scope.updateClosingCostAddedToLoanHR();  // 37
    $scope.updateTotalLoanAmountHR();         // 38
    $scope.updateCashRequiredHR();            // 39
    $scope.updateAllInCostHR();               // 40
    $scope.updatePercentOfArvHR();            // 41
    $scope.updateNetOperatingIncomeHR();      // 44
    $scope.updateNewMortgagePaymentHR();      // 50
    $scope.updateRefiLoanAmountHR();          // 51
    $scope.updateCashOutRefiHR();             // 52
    $scope.updateProfitRefiHR();              // 53
    $scope.updateRoiOnCashInvestedHR();       // 54
    $scope.updateOrgMoneyTiedUpRefiHR();      // 55
    $scope.updateEquityLeftRefiHR();          // 56
    $scope.updateCashFlowPreTaxHR();          // 57
    $scope.updateCashOnCashHR();              // 58


    console.log('updating everything');
  };

  $scope.updateEverything();


}]);

String.prototype.splice = function(idx, rem, s) {
  return (this.slice(0, idx) + s + this.slice(idx + Math.abs(rem)));
};