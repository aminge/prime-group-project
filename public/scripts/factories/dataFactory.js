myApp.factory('DataFactory', ['$http', function($http) {
    var apiData = undefined;

    // Private

    var privateCalculateMortgage = function(price, years, ir) {
        var months = parseInt(years) * 12;
        ir = ir / 1200;

        var numerator = ir * price * Math.pow(1 + ir, months);
        var denominator = Math.pow(1 + ir, months) - 1;
        var output =  numerator / denominator;
        return output.toFixed(2);
    };

    var privateAddNewUser = function(user) {
      $http.post('/register', user).then(function(response){
        
      });
    };

    var initialSearch = function(address, cityStateZip) {
        console.log('API search from factory happening NOW!', address, cityStateZip);
        var searchCriteria = {
            findAddress: address,
            findState: cityStateZip
        };
        //http returns a promise
        return $http({
            method: 'GET',
            url: '/zillow/GetDeepSearchResults',
            params: searchCriteria
        }).then(function (response) {
           apiData = response.data.results.result[0];
        });
    };







    // Public

    var publicAPI = {
        factoryCalculateMortgage: function(price, years, interestRate) {
          return privateCalculateMortgage(price, years, interestRate)
        },
        factorySearchListings: function (address, cityStateZip) {
          return initialSearch(address, cityStateZip);
        },
        factoryExportApiSearchResults: function() {
          return apiData;
        },
        factoryAddNewUser: function(user) {
          return privateAddNewUser(user);
        }

    };

    return publicAPI;

}]);