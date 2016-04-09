var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var pg = require('pg');


router.get('/', function (req, res) {
  var results = [];
  pg.connect(connection, function (err, client, done) {

    //do the work of the query here.
    var query = client.query('SELECT number_of_visits, email FROM users');

    // Stream results back one row at a time
    query.on('row', function (row) {
      results.push(row);
    });

    // close connection
    query.on('end', function () {
      client.end();
        // console.log("results: results");
      return res.json(results);

    });

    if (err) {
      console.log(err);
    }
  });
});

/////////

//router.put('/', function(req, res) {
/////split that long description string into a shorter one
//  var updateNumVistits = req.body.number_of_visits;
//  var email = req.body.email;
//  console.log('numVisits: ', updateNumVistits);
//  console.log('email: ', email);
//
//  ///commands to send POST is INSIDE the connect.
//  pg.connect(connection, function(err, client){
//
//    client.query('UPDATE users SET number_of_visits = $1, date_of_last_visit = now() WHERE email = $2',
//      [updateNumVistits, email], //pass in array of our values to POST
//      function(err, result) {   //call back function
//        if(err) {
//          console.log('Error inserting data: ', err);
//          res.send(false);
//        } else {
//          res.send(true);
//        }
//      });
//  });
//});

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
