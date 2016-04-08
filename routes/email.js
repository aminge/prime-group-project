var express = require('express');
var router = express.Router();
var passport = require('passport');
var sendgrid  = require('sendgrid')('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');

router.post('/', function(req, res) {
  var email     = new sendgrid.Email({
    to:       'iota.johnball@gmail.com',
    from:     'johndanielball86@gmail.com',
    subject:  'Hey!',
    text:     'We have the email feature working!!!!'
});
  sendgrid.send(email, function(err, json) {

    if (err) {
      res.status(500).send();
      return console.error(err);
    }
    console.log(json);
    res.status(204).send();
  });
});

module.exports = router;