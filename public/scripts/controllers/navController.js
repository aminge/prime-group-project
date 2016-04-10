myApp.controller('NavController', ['$scope', 'DataFactory', '$http', function($scope, DataFactory, $http){
console.log('NavController works');
  $scope.dataFactory = DataFactory;

  // display logout tab only if user logged in
  $scope.isUserLoggedin = false;
  //console.log(DataFactory.factoryIsUserLoggedIn());

  // display admin tab only if user role == admin
  $scope.isUserAdmin = true;

  $scope.$watch(function (scope) {return scope.dataFactory.factoryIsUserLoggedIn()},
    function(newValue, oldValue){
    //console.log('$watching in navController');
      $scope.isUserLoggedin = newValue;
  });

  $scope.logoutUser = function(){
    $scope.dataFactory.factoryLogoutUser().then(function(){
      //console.log('signed out of passport.')
    });
  }



}]);