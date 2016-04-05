var express = require('express');
var router = express.Router();
//var passport = require('passport');
var passport = require('../strategies/user.js');

// Handles login form POST from index.html
router.post('/',
    passport.authenticate('local', function(req, res) {
      if(req.user) {
        res.send(req.user);
      } else {
        res.send(false);
      }
    })

    // {
    //     // function(req, res) check if req.user exists, if it does, send req.user, if not, send false
    //     // handle this in a .then after the request is sent (in the data factory)
    //     // .then(function(response) { }
    //     successRedirect: '/views/templates/search.html',
    //     failureRedirect: '/views/templates/login.html'
    // }
);

module.exports = router;
