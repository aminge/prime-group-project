var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var encryptLib = require('../modules/encryption');
var connection = require('../modules/connection');
var pg = require('pg');

// Handles request for HTML file
router.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
});

router.post('/', function(req, res, next) {
  if(req.body.username.length == 0 || req.body.password.length == 0){
    res.redirect('/register');
  } else {

    var saveUser = {
      email: req.body.email,
      password: encryptLib.encryptPassword(req.body.password),
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      phone_number: req.body.telNumber
    };
    console.log('new user:', saveUser);

    pg.connect(connection, function (err, client, done) {
      client.query("INSERT INTO users (email, password, first_name, last_name, phone_number, account_type) " +
          "VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
        [saveUser.email, saveUser.password, saveUser.first_name, saveUser.last_name, saveUser.phone_number, 'user'],
        function (err, result) {
          client.end();

          if (err) {
            console.log("Error inserting data: ", err);
            next(err);
          } else {
            res.redirect('/');
          }
        });
    });
  }
});

module.exports = router;