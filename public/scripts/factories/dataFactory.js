myApp.factory('DataFactory', ['$http', function($http) {

    // Private

    var privateCalculateMortgage = function(price, years, ir) {
        var months = years * 12;
        ir = ir / 1200;

        var numerator = ir * price * Math.pow(1 + ir, months);
        var denominator = Math.pow(1 + ir, months) - 1;
        var output =  numerator / denominator;
        return output.toFixed(2);
    };

    // Public

    var publicAPI = {
        factoryCalculateMortgage: function(price, years, interestRate) {
            return privateCalculateMortgage(price, years, interestRate)
        }
    };

    return publicAPI;

}]);