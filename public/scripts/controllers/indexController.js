myApp.controller('IndexController', ['$scope', 'DataFactory', '$http', function($scope, DataFactory, $http){
console.log('IndexController works');
  $scope.dataFactory = DataFactory;

  $scope.userLoggedin = true;

  //console.log($scope.factoryIsUserLoggedIn());

  $scope.logoutUser = function(){
    console.log('HUZZZZAAAAAAAH! you\'re logging out');

    $http.get('/logout').then(function(){
      console.log('successfully logged out!')
    })


  }



}]);