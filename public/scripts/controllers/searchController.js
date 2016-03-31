myApp.controller('SearchController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {
  console.log('SearchController working');




// button from search.html calls searchListings():
    $scope.searchListings = function() {
        console.log('YEEEAAAH!');

        var address = $scope.addressSearch;
        var cityStateZip = $scope.citySearch + $scope.stateSearch + $scope.zipSearch;
       // console.log('search controller: ', address, cityStateZip);
        // search
        DataFactory.factorySearchListings(address, cityStateZip)
          .then(function() {
            $scope.apiResults = DataFactory.factoryExportApiSearchResults();
        }) // clear form fields
          .then(function() {
            $scope.addressSearch = null;
            $scope.citySearch = null;
            $scope.stateSearch = null;
            $scope.zipSearch = null;
          });



    };



    //begin elements for Angualar Carousel//

  $scope.noWrapSlides = false;
  $scope.active = 0;
  $scope.slides = [
    {id: 0, image: '../../images/house-1.jpg'},
    {id: 1, image: '../../images/house-2.jpg'}

  ];
  var currIndex = 0;



}]);
