var express = require('express');
var router = express.Router();
var passport = require('passport'); // ../strategies/user.js

// Handles login form POST from index.html
router.post('/',
  passport.authenticate('local'),
  function (req, res) {
    res.sendStatus(200);
  });

module.exports = router;