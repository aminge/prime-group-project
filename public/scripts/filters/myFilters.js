myApp.filter('addCommasToNumber', function(){
  return function(input) {
    if (!number) {return ''; }
    var sNumber = toString(number);
    if (sNumber.length < 3) {
      return '$' + sNumber;
    } else {
      return $scope.addCommasToNumber(sNumber.slice(0, sNumber.length - 3)) + ',' + sNumber.slice(sNumber.length - 3);
    }
  }
});

