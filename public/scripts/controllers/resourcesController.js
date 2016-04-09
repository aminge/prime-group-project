myApp.controller('ResourcesController', ['$scope', '$location', 'DataFactory', function($scope, $location, DataFactory){
  console.log('ResourcesController works' );

  // check to see if the user is logged in
  if (!DataFactory.factoryIsUserLoggedIn()) {
    // redirect to login and display message letting user know they have to log in to see the content
    DataFactory.factorySetReminderMessageToTrue();
    $location.path('./views/templates/login.html');
  }

  $scope.uploads = [
    {link : '../../hosted_files/management_agreement.pdf',
    title: 'Management Agreement'},
    {link : '../../hosted_files/move_in_check_list',
    title: 'Move-in Check List'},
    {link : '../../hosted_files/residential_lease.pdf',
    title: 'Residential Lease'},
    {link : '../../hosted_files/seller_option_to_purchase_real_estate',
    title: 'Seller Option to Purchase Real Estate'},
    {link : '../../hosted_files/sublease.pdf',
    title: 'Sublease'}
  ];

}]);
