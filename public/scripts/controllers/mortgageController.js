myApp.controller('MortgageController', ['$scope', 'DataFactory', function($scope, DataFactory) {

    $scope.dataFactory = DataFactory;

    $scope.calculateMortgage = function() {
        $scope.dataFactory.factoryCalculateMortgage($scope.price, $scope.years, $scope.interestRate);
    }
}]);