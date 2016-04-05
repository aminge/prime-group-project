var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var pg = require('pg');


router.get('/', function (req, res) {
  var results = [];
  pg.connect(connection, function (err, client, done) {

    //do the work of the query here.
    var query = client.query('SELECT number_of_visits, email, date_of_last_visit FROM users');

    // Stream results back one row at a time
    query.on('row', function (row) {
      results.push(row);
    });

    // close connection
    query.on('end', function () {
      client.end();
        console.log("results: results");
      return res.json(results);

    });

    if (err) {
      console.log(err);
    }
  });
});

module.exports = router;
