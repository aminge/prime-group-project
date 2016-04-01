var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pg = require('pg');
//var register = require('./routes/register');
var passport = require('passport');
var session = require('express-session');
var register = require('./routes/register');
//var parameters = require('./zillow/zillow');
var ZWSID = "X1-ZWz19ssev2coi3_1u0pu";
var Zillow = require('node-zillow');


//var convertSpaceToPlus = function(string) {
//  var outputString = '';
//  for (var i = 0; i < string.length; i++) {
//    if (string[i] == ' ') {
//      outputString += '+';
//    } else {
//      outputString += string[i];
//    }
//  }
//  return outputString;
//};

//var request = require('request');
//
//var xml2js = require('xml2js'); // this one neccessary?? don't think so :/
//var parseString = require('xml2js').parseString;
////var ZWSID = require('/modules/zillowID.js');

// Will automatically download and use any missing schemas

// GET request to EVE Online API


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/register', register);


// Do we need this code anymore? -Alex
//var ZWSID = "X1-ZWz19ssev2coi3_1u0pu";
//var url = "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=" + ZWSID
//    + "&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA";
//app.get('/zillow/:searchCriteria', function(req, res){
//
//  url = 'http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=' + ZWSID
//  + '&address=' + convertSpaceToPlus(req.body.address) + '&citystatezip=' + req.body.city + '%2C+' + req.body.state;
//  // not sure how to attach the zip code in the request, since it isn't in the sample
//
//request(
//  { method: 'GET',
//    uri: url,
//    gzip: true
//  },
//  function (error, response, body){
//    console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
//    console.log('the decoded data is: ' + body);
//  }).on('data', function(data){
//    console.log('decoded chunk: ' + data);
//  }).on('response', function(response) {
//  response.on('data', function (data) {
//    console.log('received ' + data.length + ' bytes of compressed data');
//  });
//});

app.get('/zillow/GetDeepSearchResults', function(req, res){
  var zillow = new Zillow(ZWSID);

  var queryParameters = req.query;

  console.log('req.query is: ', req.query);

 // get will return a promise
  zillow.get('GetDeepSearchResults', {
    address: queryParameters.findAddress,
    citystatezip: queryParameters.findState
  }).then(function(data) {
    res.send(data.response);
  });
});





app.get('/zillow/GetUpdatedPropertyDetails/:zpid', function(req, res){
  var zillow = new Zillow(ZWSID);
  //var queryParameters = req;
  //console.log('queryParameters are ', queryParameters);
  //console.log('zpid is ', queryParameters.zpid);
  // I think the problem is that queryParameters doesn't have the zpid
  // this console log is printing out 'zpid is undefined'


  console.log(req.params.zpid);

  var zpid = req.params.zpid;
  //var zpid = 1234;
  console.log('zpid is ', zpid);

// get will return a promise
  zillow.get('GetUpdatedPropertyDetails', {
    zpid: parseInt(zpid)
  }).then(function(data) {
    res.send(data);
  });

});




// Serve back static files
app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/templates'));
app.use(express.static('public/fonts'));
app.use(express.static('public/images'));
app.use(express.static('public/scripts'));
app.use(express.static('public/scripts/factories'));
app.use(express.static('public/scripts/controllers'));
app.use(express.static('public/styles'));
app.use(express.static('public/styles/css'));
app.use(express.static('public/styles/scss'));
app.use(express.static('public/vendors'));

//app.use(search);
//app.use(register);

////app.use(session({
//  secret: 'secret',
//  key: 'user',
//  resave: 'true',
//  saveUninitialized: false,
//  cookie: {maxage: 60000, secure: false}
//}));

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
  console.log('Kicking ass and taking names on port ', app.get('port'));
});
