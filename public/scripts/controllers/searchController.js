myApp.controller('SearchController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {
  console.log('SearchController working');
    $scope.dataFactory = DataFactory;



// button from search.html calls searchListings():
    $scope.searchListings = function() {
        console.log('YEEEAAAH!');

        // TODO: encodeURIComponent JS function or angular directive? -address & cityStateZip

        var address = $scope.addressSearch;
        var cityStateZip = $scope.citySearch + $scope.stateSearch + $scope.zipSearch;
       // console.log('search controller: ', address, cityStateZip);
        // search
        $scope.dataFactory.factorySearchListings(address, cityStateZip).then(function() {
            $scope.apiResults = $scope.dataFactory.factoryExportApiSearchResults();
        });

        // clear form fields
        $scope.addressSearch = null;
        $scope.citySearch = null;
        $scope.stateSearch = null;
        $scope.zipSearch = null;
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
