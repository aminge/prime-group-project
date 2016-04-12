myApp.factory('DataFactory', ['$http', '$location', function($http, $location) {
  var apiData = undefined;
  var apiPhotoData = undefined;
  var mortgage = undefined;
  var housePrice = 50000;
  var isUserLoggedIn = false;
  var displayReminderMessage = false;
  var failedLogin = false;
  var accountType = 'user';

// Private
  // logout user
  var privateLogout = function() {
    var promise = $http.get('/logout').then(function(response){
      isUserLoggedIn = false;
      displayReminderMessage = false;
      $location.path('/login');
      //console.log('logout success!:: dataFactory');
      accountType = 'user';
    });
    return promise;
  };

  var privateSetReminderMessageToTrue = function() {
    displayReminderMessage = true;
  };

  // I'm not actually sure if we need this function, but we might, so I'm leaving it here for now
  var privateSetFailedLoginToTrue = function() {
    failedLogin = true;
  };

  var privateAddNewUser = function(user) {
    $http.post('/register', user).then(function(response){
      //console.log('Successfully added new user');
    });
  };

  var privateLoginUser = function(user) {
    var promise = $http.post('/login', user).then(
      function (res) {
        $location.path('/search');
        isUserLoggedIn = true;
        //console.log('this is the response from privateLoginUser factory', res);
        failedLogin = false;
      },
      function (err) {
        $location.path('/login');
        failedLogin = true;
      });
    return promise;
  };

  var privateUpdateUser = function(user) {
    var promise = $http.put('/updateUser', user).then(function(response) {
      //console.log('user updated successfully ', response);
    });
    return promise;
  };

  var privateGetAccountType = function(user) {
    var promise = $http.post('/updateUser', user).then(function(response) {
      accountType = response.data.account_type;
      //console.log('from factory: ', accountType);
    });
    return promise;
  };

  var initialSearch = function(address, cityStateZip) {
    //console.log('API search from factory happening NOW!', address, cityStateZip);
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
      housePrice = Math.round(apiData.zestimate[0].amount[0]._);

      var zpid = parseInt(apiData.zpid[0]);

      return $http({
        method: 'GET',
        url: '/zillow/GetUpdatedPropertyDetails/' + zpid
      }).then(function (response) {
        try {
          apiPhotoData = response.data.response.images.image[0].url;
        } catch(err) {
          apiPhotoData = [];
          //console.log('Error: ', err);
        }
        //console.log(apiPhotoData);
      });
    });
  };

  var privateCalculateMortgage = function(price, years, ir) {
    var months = parseInt(years) * 12;

    if (!ir || ir == 0) {
      var output = parseFloat(price) / months;
      mortgage = output.toFixed(2);
      return mortgage;
    }

    ir = parseFloat(ir);
    ir = ir / 1200;
    var numerator = ir * parseFloat(price) * Math.pow(1 + ir, months);
    var denominator = Math.pow(1 + ir, months) - 1;
    var output =  numerator / denominator;
    mortgage = output.toFixed(2);
    return mortgage;
  };

  var privateUpdatePrice = function(price) {
    housePrice = parseInt(price);
    //console.log('updating house price to ', housePrice);
  };


    // Public

    var publicAPI = {
      factoryCalculateMortgage: function(price, months, interestRate) {
        return privateCalculateMortgage(price, months, interestRate)
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
      factoryUpdateUser: function(user) {
        return privateUpdateUser(user)
      },
      factoryGetPhotos: function() {
        return apiPhotoData;
      },
      factoryExportMortgage: function() {
        return mortgage;
      },
      factoryExportPrice: function() {
        //console.log('exporting price, which is ', housePrice);
        return housePrice;
      },
      factoryUpdatePrice: function(price) {
        return privateUpdatePrice(price);
      },
      factoryIsUserLoggedIn: function() {
        return isUserLoggedIn;
      },
      factoryDisplayReminderMessage: function() {
        //console.log('Getting displayReminderMessage, which is equal to: ', displayReminderMessage);
        return displayReminderMessage;
      },
      factorySetReminderMessageToTrue: function () {
        return privateSetReminderMessageToTrue();
      },
      factoryLogoutUser: function(){
        return privateLogout();
      },
      factoryGetFailedLogin: function() {
        return failedLogin;
      },
      factorySetFailedLoginToTrue: function() {
        return privateSetFailedLoginToTrue();
      },
      factoryGetAccountType: function(user) {
        return privateGetAccountType(user);
      },
      factoryExportAccountType: function() {
        return accountType;
      }
    };

    return publicAPI;

}]);
