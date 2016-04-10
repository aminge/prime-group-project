var express = require('express');
var router = express.Router();

// Handles logout from index.html nav button
router.get('/', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;