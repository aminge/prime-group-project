myApp.factory('DataFactory', ['$http', function($http) {

    // Private

    var privateCalculateMortgage = function(price, years, ir) {
        var months = parseInt(years) * 12;
        ir = ir / 1200;

        var numerator = ir * price * Math.pow(1 + ir, months);
        var denominator = Math.pow(1 + ir, months) - 1;
        var output =  numerator / denominator;
        return output.toFixed(2);
    };

    var initialSearch = function(address, cityStateZip) {
        console.log('API search from factory happening NOW!', address, cityStateZip);
        var ZWSID = "X1-ZWz19ssev2coi3_1u0pu";

        // test hardcoded request url:
        var url = "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=" + ZWSID + "&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA";


        //var url = "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=" + ZWSID + "&address="
        //    + address + "&citystatezip=" + cityStateZip;

        var promise = $http.jsonp(url).then(function(response) {
            apiData = response.data.results;
            console.log('Async data response: ', apiData);
        });
        return promise;
    };


    // Public

    var publicAPI = {
        factoryCalculateMortgage: function(price, years, interestRate) {
            return privateCalculateMortgage(price, years, interestRate)
        },
        factoryAPICall: function (address, cityStateZip) {
            return initialSearch(address, cityStateZip);
        },
        factoryExportApiSearchResults: function() {
            return apiData;
        }

    };

    return publicAPI;

}]);