myApp.factory('DataFactory', ['$http', function($http) {
    var apiData = undefined;
    var apiPhotoData = undefined;

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
        console.log('Successfully added new user');
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
          //console.log('from factory: ', apiData);

          // GetUpdatedPropertyDetails
          //console.log(apiData.zpid[0]);

          var zpid = parseInt(apiData.zpid[0]);
          //console.log('zpid is ', zpid);

          return $http({
            method: 'GET',
            url: '/zillow/GetUpdatedPropertyDetails/' + zpid
          }).then(function (response) {
            try {
              apiPhotoData = response.data.response.images.image[0].url;
            } catch(err) {
              apiPhotoData = [];
              console.log('Error: ', err);
            }
            console.log(apiPhotoData);
          });
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
      },
      factoryGetPhotos: function() {
        return apiPhotoData;
      }
    };

    return publicAPI;

}]);