var express = require('express');
var router = express.Router();
var passport = require('passport');

// Handles login form POST from index.html
router.post('/',
    passport.authenticate('local', {
        successRedirect: '/views/templates/search.html',
        failureRedirect: '/views/templates/failure.html'
    })
);

module.exports = router;