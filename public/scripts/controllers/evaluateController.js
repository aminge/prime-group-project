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
  $scope.includeCloseHoldCosts = '1';               // 4
  $scope.rehabBudget = 20000;                       // 5
  $scope.projectRehabPeriod = 2;                    // 6
  $scope.financingUsed = '1';                       // 7  (1 = true, 0 = false)
  $scope.lenderAVRCostOfProject = 'cost';           // 8
  $scope.maxPercentOfCostFinanced = 90;             // 9
  $scope.originationDiscountPoints = 3;             // 10
  $scope.otherClosingCosts = 0;                     // 11
  $scope.pointsClosingCosts = 'backend';            // 12
  $scope.interestRate = 10;                         // 13
  $scope.interestPaymentDuringRehab = '1';          // 14
  $scope.splitBackendProfitsWithLender = '1';       // 15
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
    $scope.totalCapNeeded = $scope.purchasePrice + $scope.holdingCosts + $scope.closingCosts + $scope.rehabBudget;
  };


  $scope.updateMaxDollarsFinanced = function() {      // 20

    if ($scope.lenderAVRCostOfProject == 'arv') {
      $scope.maxDollarsFinanced = $scope.internalArvForFlip * $scope.internalMaxPercentOfCostFinanced / 100;
      //console.log('lenderAVRCostOfProject is ', $scope.lenderAVRCostOfProject);
    } else if ($scope.lenderAVRCostOfProject == 'cost') {
      //console.log('purchase price: ', $scope.internalPurchasePrice);
      //console.log('rehab budget ', $scope.internalRehabBudget);
      //console.log('max percent ', $scope.internalMaxPercentOfCostFinanced);
      $scope.maxDollarsFinanced = ($scope.internalPurchasePrice + $scope.internalRehabBudget) * $scope.internalMaxPercentOfCostFinanced / 100;
      //console.log('lenderAVRCostOfProject is ', $scope.lenderAVRCostOfProject);
    }
    //console.log($scope.maxDollarsFinanced);
  };

  $scope.updateActualToBeFinanced = function() {       // 21
    if ($scope.lenderAVRCostOfProject == 'arv') {
      $scope.actualToBeFinanced = $scope.internalArvForFlip * $scope.internalMaxPercentOfCostFinanced;
    } else if ($scope.lenderAVRCostOfProject == 'cost') {
      $scope.actualToBeFinanced = ($scope.internalPurchasePrice + $scope.internalRehabBudget) * $scope.internalMaxPercentOfCostFinanced / 100;
    }
  };

  $scope.updateClosingCostAddedToLoan = function() {
    if ($scope.financingUsed == '0') {
      $scope.closingCostAddedToLoan = 0;
      return;
    }

    var totalAddedCosts = 0;                    // this is what's going to be returned
    var baseCost = $scope.actualToBeFinanced;   // this is the base cost, from which we will calculate the interest to be added to the total cost

    if ($scope.includeCloseHoldCosts == '1') {
      totalAddedCosts += $scope.internalClosingCosts + $scope.internalHoldingCosts;
      baseCost += $scope.internalClosingCosts + $scope.internalHoldingCosts;
    } else if ($scope.includeCloseHoldCosts == '0') {

    }

    if ($scope.pointsClosingCosts == 'upfront') {
      $scope.closingCostAddedToLoan = $scope.internalClosingCosts + $scope.internalHoldingCosts;
    } else if ($scope.pointsClosingCosts == 'backend') {

    }

    if ($scope.interestPaymentDuringRehab == '1') {

    } else if ($scope.interestPaymentDuringRehab == '0') {

    }
    $scope.closingCostAddedToLoan = 7086;
    //var totalMonths = $scope.internalProjectRehabPeriod + $scope.internalMonthsCompleteSaleAfterRehab;
    //var baseCost = $scope.actualToBeFinanced + $scope.internalClosingCosts + $scope.internalHoldingCosts;
    //var interest = calculateInterest()


    //if ($scope.includeCloseHoldCosts == '0' && $scope.lenderAVRCostOfProject == 'cost' && $scope.pointsClosingCosts == 'upfront' && $scope.interestPaymentDuringRehab == '0') {
    //
    //} else if (true) {
    //
    //}
    //var costs = 1;

  };

  $scope.updateTotalLoanAmount = function() {
    $scope.totalLoanAmount = $scope.actualToBeFinanced + $scope.closingCostAddedToLoan;
  };

  $scope.updateCashRequiredOverLife = function() {
    if ($scope.financingUsed == '0') { // all cash
      $scope.cashRequiredOverLife = $scope.internalPurchasePrice + $scope.internalClosingCosts + $scope.internalHoldingCosts;
      console.log('all cash');
    } else if ($scope.financingUsed == '1') { // financing
      $scope.cashRequiredOverLife = $scope.totalCapNeeded - $scope.actualToBeFinanced - $scope.internalClosingCosts - $scope.internalHoldingCosts;
      console.log('financing');
    } else {
      console.log('neither');
      console.log('financing used is: ', $scope.financingUsed);
    }

    if ($scope.cashRequiredOverLife < 0) {
      $scope.cashRequiredOverLife = 0;
    }

    console.log('cash required has been updated and is now: ', $scope.cashRequiredOverLife);
  };

  $scope.updateTotalCostEndOfRehab = function() {
    $scope.totalCostEndOfRehab = $scope.totalLoanAmount + $scope.cashRequiredOverLife;
  };

  $scope.updatePercentageOfArv = function() {
    $scope.percentageOfArv = Math.round($scope.totalCostEndOfRehab / $scope.internalArvForFlip);
  };

  $scope.updateProjectedProfit = function() {
    var percentOfSale = (100 - $scope.internalProjectedCostSale) / 100;
    $scope.projectedProfit = (($scope.internalProjectedResalePrice * percentOfSale) - $scope.totalCostEndOfRehab) * $scope.internalPercentagePreTaxProfits / 100;
  };

  $scope.updateReturnOnCashInvested = function() {
    $scope.returnOnCashInvested = Math.round($scope.projectedProfit / $scope.cashRequiredOverLife);
  };

  $scope.updateEverything = function() {
    $scope.internalPurchasePrice = parseFloat($scope.purchasePrice);                                   // 1
    $scope.internalClosingCosts = parseFloat($scope.closingCosts);                                     // 2
    $scope.internalHoldingCosts = parseFloat($scope.holdingCosts);                                     // 3
    $scope.internalRehabBudget = parseFloat($scope.rehabBudget);                                       // 5

    console.log('rehab budget: ', $scope.rehabBudget);
    console.log('internal rehab budget: ', $scope.internalRehabBudget);

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
    $scope.internalMonthsToRentAfterRehab = parseFloat($scope.monthsToRentAfterRehab);                 // 33
    $scope.internalProjectedOperatingIncome = parseFloat($scope.projectedOperatingIncome);             // 42
    $scope.internalProjectedOperatingExpenses = parseFloat($scope.projectedOperatingExpenses);         // 43
    $scope.internalRefiPercentARV = parseFloat($scope.refiPercentARV);                                 // 46
    $scope.internalNewMortgageRate = parseFloat($scope.newMortgageRate);                               // 47
    $scope.internalAmortizationYears = parseFloat($scope.amortizationYears);                           // 48
    $scope.internalRefiDiscPtsMiscCosts = parseFloat($scope.refiDiscPtsMiscCosts);                     // 49

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