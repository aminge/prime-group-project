myApp.controller('SearchController', ['$scope', '$http', '$location', 'DataFactory', function($scope, $http, $location, DataFactory) {
  //console.log('SearchController working');

  $scope.dataFactory = DataFactory;

  if (!$scope.dataFactory.factoryIsUserLoggedIn()) {
    $scope.dataFactory.factorySetReminderMessageToTrue();
    $location.path('./views/templates/login.html');
  }

  $scope.userHasSearched = false;

  $scope.model = {
    stateSearch: "MN"
  };

    $scope.searchListings = function() {

      var address = $scope.addressSearch;
      var cityStateZip = $scope.citySearch + $scope.model.stateSearch + $scope.zipSearch;

      $scope.dataFactory.factorySearchListings(address, cityStateZip)
        .then(function () {
          $scope.apiResults = DataFactory.factoryExportApiSearchResults();
          $scope.pricePerSquareFoot = Math.round($scope.apiResults.zestimate[0].amount[0]._ / $scope.apiResults.finishedSqFt[0]);
          $scope.dataFactory.factoryUpdatePrice($scope.apiResults.zestimate[0].amount[0]._);
        })
         .then(function() {
            $scope.userHasSearched = true;
            $scope.addressSearch = null;
            $scope.citySearch = null;
            $scope.model.stateSearch = null;
            $scope.zipSearch = null;

            var photoArray = $scope.dataFactory.factoryGetPhotos();
            $scope.slides = [];

            if (photoArray.length < 1) {
              $scope.slides = [
                {id: 0, image: '../../images/mpls-1.jpg'}
              ];
              $scope.showAltMessage = true;

            } else {
              $scope.showAltMessage = false;
              for (var i = 0; i < photoArray.length; i++) {
                $scope.slides.push({id: i, image: photoArray[i]});
              }
            }
          });
  };

  $scope.noWrapSlides = false;
  $scope.active = 0;
  $scope.slides = [
    {id: 0, image: '../../images/mpls-1.jpg'}
  ];
}]);
