myApp.controller('NavController', ['$scope', 'DataFactory', '$http', function($scope, DataFactory, $http){
console.log('NavController works');
  $scope.dataFactory = DataFactory;

  // display logout tab only if user logged in
  $scope.isUserLoggedin = true;
  console.log(DataFactory.factoryIsUserLoggedIn());

  // display admin tab only if user role == admin
  $scope.isUserAdmin = true;



  $scope.logoutUser = function(){
    console.log('HUZZZZAAAAAAAH! you\'re logging out');

  //  $http.get('/logout'){
  //    console.log('successfully logged out!')
  //  }
  //
  }



}]);