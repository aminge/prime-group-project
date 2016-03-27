var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pg = require('pg');
//var passport = require('passport');
//var session = require('express-session');
//var register = require('./routes/register');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
