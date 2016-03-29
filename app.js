var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pg = require('pg');
//var register = require('./routes/register');
var passport = require('passport');
var session = require('express-session');
var request = require('request');
var xml2js = require('xml2js'); // this one neccessary?? don't think so :/
var parseString = require('xml2js').parseString;
//var ZWSID = require('/modules/zillowID.js');
var register = require('./routes/register');



//var request = require('request');
//
//var xml2js = require('xml2js'); // this one neccessary?? don't think so :/
//var parseString = require('xml2js').parseString;
////var ZWSID = require('/modules/zillowID.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/register', register);


var ZWSID = "X1-ZWz19ssev2coi3_1u0pu";
var url = "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=" + ZWSID
    + "&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA";


app.get('/zillow/:searchCriteria', function(req, res){

request(
    { method: 'GET',
    uri: url,
    gzip: true
    },
    function (error, response, body){
        console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
        console.log('the decoded data is: ' + body)
    }).on('data', function(data){
        console.log('decoded chunk: ' + data)
    }).on('response', function(response) {
        response.on('data', function(data){
            console.log('received ' + data.length + ' bytes of compressed data')
        })
    });
    //.get(url, function(error, request, body) {
    //console.log('made it to app.js!')
    //.on('response', function(response){
    //    console.log(response.statusCode);
    //    console.log(response.headers['content-type']);
    //});
    //
    ////parse XML data from body
    //parseString(body, function(err, result){
    //    console.log(result);
    //   console.dir(result);
    //});
//});


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
