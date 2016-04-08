myApp.controller('IndexController', ['$scope', 'DataFactory', '$http', function($scope, DataFactory, $http){
console.log('IndexController works');
  $scope.dataFactory = DataFactory;

  console.log(DataFactory.factoryIsUserLoggedIn());
  $scope.isUserLoggedin = true;

  //$scope.$watch.isUserLoggedin = true;
  //$scope.isUserLoggedin = DataFactory.factoryIsUserLoggedIn();

  //console.log($scope.factoryIsUserLoggedIn());

  $scope.logoutUser = function(){
    console.log('HUZZZZAAAAAAAH! you\'re logging out');

  //  $http.get('/logout'){
  //    console.log('successfully logged out!')
  //  }
  //
  }



}]);