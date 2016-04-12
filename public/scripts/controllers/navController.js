myApp.controller('NavController', ['$scope', 'DataFactory', '$http', function($scope, DataFactory, $http){
console.log('NavController works');
  $scope.dataFactory = DataFactory;

  // display logout tab only if user logged in
  $scope.isUserLoggedin = false;
  // display admin tab only if accountType == admin
  $scope.adminUser = false;

  $scope.$watch(function (scope) {return scope.dataFactory.factoryIsUserLoggedIn()},
    function(newValue, oldValue){
      $scope.isUserLoggedin = newValue;
      $scope.adminUser = false;
  });

  $scope.$watch(function (scope) {return scope.dataFactory.factoryExportAccountType()},
    function(newValue, oldValue){
     if (newValue == 'admin') {
       $scope.adminUser = true;
     }
    }
  );

  $scope.logoutUser = function(){
    $scope.dataFactory.factoryLogoutUser().then(function(){
      $scope.isUserLoggedin = false;
      $scope.adminUser = false;
      //console.log('signed out of passport.')
    });
  }



}]);