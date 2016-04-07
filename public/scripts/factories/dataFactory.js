myApp.factory('DataFactory', ['$http', '$location', function($http, $location) {
  var apiData = undefined;
  var apiPhotoData = undefined;
  var mortgage = undefined;
  var housePrice = 0;

  // Private

  var isUserLoggedIn = false;
  var displayReminderMessage = false;

  // Private

  var privateSetReminderMessageToTrue = function() {
    displayReminderMessage = true;
  };

  var privateAddNewUser = function(user) {
    $http.post('/register', user).then(function(response){
      console.log('Successfully added new user');
    });
  };

  var privateLoginUser = function(user) {
    console.log('sending login to server');
    $http.post('/login', user).then(
      // this needs to be different
      function (res) {
        $location.path('/search');
        isUserLoggedIn = true;
      },
      function (err) {
        $location.path('/login');
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
      housePrice = Math.round(apiData.zestimate[0].amount[0]._);
      console.log('factory housePrice: ', housePrice);
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

  var privateCalculateMortgage = function(price, years, ir) {
    var months = parseInt(years) * 12;
    ir = ir / 1200;
    var numerator = ir * price * Math.pow(1 + ir, months);
    var denominator = Math.pow(1 + ir, months) - 1;
    var output =  numerator / denominator;
    mortgage = output.toFixed(2);
console.log(mortgage);
    return mortgage;
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
      factoryLoginUser: function(user) {
        return privateLoginUser(user);
      },
      factoryGetPhotos: function() {
        return apiPhotoData;
      },
      factoryExportMortgage: function() {
        return mortgage;
      },
      factoryExportPrice: function() {
        return housePrice;
      },
      factoryIsUserLoggedIn: function() {
        return isUserLoggedIn;
      },
      factoryDisplayReminderMessage: function() {
        console.log('Getting displayReminderMessage, which is equal to: ', displayReminderMessage);
        return displayReminderMessage;
      },
      factorySetReminderMessageToTrue: function () {
        return privateSetReminderMessageToTrue();
      }
    };

    return publicAPI;

}]);