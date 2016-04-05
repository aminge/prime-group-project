myApp.controller('SearchController', ['$scope', '$http', '$location', 'DataFactory', function($scope, $http, $location, DataFactory) {
  console.log('SearchController working');

  // check to see if the user is logged in
  if (!DataFactory.factoryIsUserLoggedIn()) {
    // redirect to login and display message letting user know they have to log in to see the content
    DataFactory.factorySetReminderMessageToTrue();
    $location.path('./views/templates/login.html');
  }

  $scope.userHasSearched = false;

  $scope.addCommasToNumber = function(number) {
    if (!number) {
      return '';
    }
    var sNumber = toString(number);
    if (sNumber.length < 3) {
      return '$' + sNumber;
    } else {
      return $scope.addCommasToNumber(sNumber.slice(0, sNumber.length - 3)) + ',' + sNumber.slice(sNumber.length - 3);
    }
  };

  $scope.model = {
    stateSearch: "MN"
  };

// button from search.html calls searchListings():
    $scope.searchListings = function() {

      console.log('YEEEAAAH!');

      var address = $scope.addressSearch;
      var cityStateZip = $scope.citySearch + $scope.model.stateSearch + $scope.zipSearch;
      //console.log('search controller: ', address, cityStateZip);

      // search
      DataFactory.factorySearchListings(address, cityStateZip)
        .then(function () {
          $scope.apiResults = DataFactory.factoryExportApiSearchResults();
          $scope.pricePerSquareFoot = Math.round($scope.apiResults.zestimate[0].amount[0]._ / $scope.apiResults.finishedSqFt[0]);
        }) // clear form fields
         .then(function() {
            $scope.userHasSearched = true;
            $scope.addressSearch = null;
            $scope.citySearch = null;
            $scope.model.stateSearch = null;
            $scope.zipSearch = null;

            var photoArray = DataFactory.factoryGetPhotos();
            $scope.slides = [];

            console.log('photoArray is ', photoArray);
            console.log('length of photoArray is ', photoArray.length);

            if (photoArray.length < 1) {
              console.log('resetting photo array');
              // display message saying no photos are available
              $scope.slides = [
                {id: 0, image: '../../images/mpls-1.jpg'}
              ];
            } else {
              for (var i = 0; i < photoArray.length; i++) {
                $scope.slides.push({id: i, image: photoArray[i]});
              }
            }
          });
};

  //begin elements for Angular Carousel//

  $scope.noWrapSlides = false;
  $scope.active = 0;
  $scope.slides = [
    {id: 0, image: '../../images/mpls-1.jpg'}
  ];
  var currIndex = 0;

}]);