myApp.controller('ResourcesController', ['$scope', 'DataFactory', function($scope, DataFactory){
  console.log('ResourcesController works' );

  $scope.uploads = ['file #1', 'file #2', 'file #3', 'file #4', 'file #5', 'file#6'];

}]);
