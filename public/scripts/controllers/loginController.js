myApp.controller('LoginController', ['$scope', 'DataFactory', '$http', function($scope, DataFactory, $http){
console.log('LoginController works');
  $scope.dataFactory = DataFactory;

  $scope.hideForm = $scope.dataFactory.factoryDisplayReminderMessage();

  $scope.failedLogin = false;

  $scope.backToForm = function() {
    $scope.hideForm = false;
  };

  //console.log($scope.hideForm);

  $scope.loginUser = function() {

    if (!$scope.email || !$scope.password) {
      // do stuff to prevent the user from logging in
      $scope.failedLogin = true;
      return
    }

    var user = {
      email: $scope.email,
      password: $scope.password
    };

    $scope.failedLogin = false;

    // This route should make it so that we only need a single put call to update the user, instead of a get call followed by a put call
    // The put call is in the data factory
    $scope.dataFactory.factoryLoginUser(user).then($scope.dataFactory.factoryUpdateUser(user));

    // ***************
    //var userIndex;
    //
    //$scope.dataFactory.updateUser();
    ////get user data to update it for admin view
    //$http.get('/updateUser').then(function(response){
    //          $scope.updateUser = response.data;
    //          console.log($scope.updateUser);
    //
    //          for (var i = 0; i < $scope.updateUser.length; i++) {
    //            if ($scope.updateUser[i].email == user.email) {
    //
    //              console.log('found email match, ', $scope.updateUser[i].email);
    //              $scope.updateUser[i].number_of_visits++;
    //              console.log('number of visits', $scope.updateUser[i].number_of_visits);
    //              userIndex = i;
    //
    //            }
    //          }
    //        }
    //      ).then(function(response){
    //
    //        console.log('user object', $scope.updateUser[userIndex]);
    //        $http.put('/updateUser', $scope.updateUser[userIndex]).then(function (response) {
    //          console.log('data updated');
    //        });
    //
    //
    //      });
    // ***************
  };
  //links to the sendgrid function
  $scope.sendEmail = function() {
    $http.post("/email").then(function(response) {
    });
  }
}]);
