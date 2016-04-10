var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var pg = require('pg');


router.post('/', function (req, res) {
  pg.connect(connection, function (err, client, done) {
    client.query('SELECT account_type, email FROM users WHERE email = $1',
      [req.body.email],
      function (err, results) {
        //console.log('results are: ', results.rows[0].account_type);
        res.send(results.rows[0]);
        client.end();

        if (err) {
          console.log('Error retrieving account_type ', err);
        }
      });
  });
});

// This route should make it so that we only need a single put call to update the user, instead of a get call followed by a put call
router.put('/', function(req, res) {
  pg.connect(connection, function(err, client) {
    client.query('UPDATE users SET number_of_visits = number_of_visits + 1, date_of_last_visit = now() WHERE email = $1',
    [req.body.email],
    function(err, result) {
      if(err) {
        console.log('Error inserting data: ', err);
        res.send(false);
      } else {
        console.log('Successfully updated user!');
        res.send(true);
      }
    });
  });
});

module.exports = router;
