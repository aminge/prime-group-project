myApp.controller('LoginController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory){
console.log('LoginController works');

  $scope.dataFactory = DataFactory;

  $scope.hideForm = $scope.dataFactory.factoryDisplayReminderMessage();

  $scope.failedLogin = false;

  $scope.backToForm = function() {
    $scope.hideForm = false;
  };

  console.log($scope.hideForm);

  $scope.loginUser = function() {

    //if (!$scope.email || !$scope.password) {
    //  // do stuff to prevent the user from logging in
    //  $scope.failedLogin = true;
    //  return
    //}

    var user = {
      email: $scope.email,
      password: $scope.password
    };

    $scope.failedLogin = false;

    $scope.dataFactory.factoryLoginUser(user);
    //get user data to update it for admin view
    $http.get('/updateUser').then(function(response){
              $scope.updateUser = response.data;
              console.log($scope.updateUser);

              for (var i = 0; i < $scope.updateUser.length; i++) {
                if ($scope.updateUser[i].email == user.email) {
                  $scope.updateUser.number_of_visits++;
                  console.log('number of visits', $scope.updateUser.number_of_visits);
                }
              }
            }
          ).then(function(response){
            
          });



  };
}]);
