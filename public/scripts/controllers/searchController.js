myApp.controller('SearchController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {
    console.log('SearchController working');
    $scope.dataFactory = DataFactory;



    $scope.searchListings = function(){
        console.log('YEEEAAAH!');
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
