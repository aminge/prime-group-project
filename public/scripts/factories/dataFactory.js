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



        var ZWSID = "X1-ZWz19ssev2coi3_1u0pu";

        // test hardcoded request url:
        var url = "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=" + ZWSID + "&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA";


        //var url = "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=" + ZWSID + "&address="
        //    + address + "&citystatezip=" + cityStateZip;

        var promise = $http.get('/zillow/' + searchCriteria).then(function(response) {


            console.log('data factory says yeehaw', searchCriteria);
            apiData = response.data;
            console.log('Async data response: ', apiData);
        });

        //return promise;
    //    var promise = $http.get('/GetZestimate').then(function(results) {
    //        console.log('data factory says yeehaw', searchCriteria);
    //        apiData = results;
    //        console.log('Async data response: ', apiData);
    //    });

        return promise;
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