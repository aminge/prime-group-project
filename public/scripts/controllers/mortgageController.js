myApp.controller('MortgageController', ['$scope', 'DataFactory', function($scope, DataFactory) {
console.log('MortgageController works');
    $scope.dataFactory = DataFactory;




    $scope.calculateMortgage = function() {
        $scope.dataFactory.factoryCalculateMortgage(parseFloat($scope.price), $scope.years, $scope.interestRate);
        $scope.mortgage = $scope.dataFactory.factoryExportMortgage()
      console.log(mortgage);
    };






}]);
