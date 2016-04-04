myApp.controller('ResourcesController', ['$scope', '$location', 'DataFactory', function($scope, $location, DataFactory){
  console.log('ResourcesController works' );

  // check to see if the user is logged in
  if (!DataFactory.factoryIsUserLoggedIn()) {
    // redirect to login and display message letting user know they have to log in to see the content
    DataFactory.factorySetReminderMessageToTrue();
    $location.path('./views/templates/login.html');
  }

  $scope.uploads = ['file #1', 'file #2', 'file #3', 'file #4', 'file #5', 'file#6'];

}]);
