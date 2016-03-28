var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var encryptLib = require('../modules/encryption');
var connection = require('../modules/connection');
var pg = require('pg');

router.post('/', function(req, res, next) {
  if(req.body.username.length == 0 || req.body.password.length == 0){
    res.redirect('/register');
  } else {

    var saveUser = {
      email: req.body.email,
      password: encryptLib.encryptPassword(req.body.password)
    };
    console.log('new user:', saveUser);

    pg.connect(connection, function (err, client, done) {
      client.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id",
        [saveUser.email, saveUser.password],
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