// node-zillow
var Zillow  = require('node-zillow');
var _        = require('lodash'); // need here??
var apiNames = _.keys(require('../lib/api-list')); //
var inspect  = require('eyes').inspector({maxLength: 50000});



// Instantiate a zillow object by passing in our own custom Zillow id (zswid):
var zwsid = 'X1-ZWz19ssev2coi3_1u0pu';
var zillow = new Zillow(zwsid);


// Make sure we have specified the correct API name in the arguments
var apiName = process.argv[2];
if (!_.contains(apiNames, apiName)) throw new Error('requires apiName: \n' + apiNames.join(', '));


// Call parameters based on which API we are calling
var parameters = (function() {
    switch (apiName) {
        case 'GetDeepSearchResults':      return params.addressWithupdates;
        case 'GetUpdatedPropertyDetails': return params.zpidWithUpdates;
        case 'GetDeepComps':              return _.extend(params.zpidWithComps, {count: 5});
        case 'GetRateSummary':            return {state: 'CO'};
        case 'GetMonthlyPayments':        return {price: 200000};
        case 'GetDemographics':           return params.zip;
        case 'GetRegionChildren':         return {state: 'CO'};
        case 'GetRegionChart':            return params.chart;
        case 'GetSearchResults':          return params.addressWithupdates;
        case 'GetZestimate':              return params.zpidWithZestimate;
        case 'GetChart':                  return _.extend(params.chart, params.zpidWithZestimate);
        case 'GetComps':                  return _.extend(params.zpidWithComps, {count: 5});
        default:
            throw new Error();
    }
})();


// Call the primary API function based on the arguments passed in
var example = zillow.get(apiName, parameters);

app.get('/GetZestimate', function(req, res){

    example.then(function(data) {
    inspect(data);
    return data;

});
});







//
//
//var parameters = {
//    zpid: 1111111
//};
//
//zillow.get('/GetZestimate', parameters)
//    .then(function(results) {
//        console.log('From app.js zillow.get call: ', results);
//
//        return results;
//        // results here is an object { message: {}, request: {}, response: {}}
//    });
