'use strict';

var personsRepo = require('../repository/persons');
var meetingsRepo = require('../repository/meetings');

/**
 * Express middleware for person model
 * @type {{findAll: Function}}
 */
module.exports = {
  findAll: function (req, res, next) {
    var persons;
    personsRepo.findAll()
      .then((results) => {
        persons = results;
        var findUpcomingPromises = persons.map((person) => {
          return meetingsRepo.findUpcoming({
            limit: 1,
            persons: [ person ]
          });
        });

        return Promise.all(findUpcomingPromises);
      })
      .then((results) => {

        // create results with upcoming events
        var personsExtended = persons.map((person, index) => {
          var upcomingMeeting;
          if (results[index].length) {
            upcomingMeeting = results[index][0];
          }

          return {
            name: person,
            meeting: upcomingMeeting
          }
        });

        res.status(200).json(personsExtended);
        return next();
      })
      .catch((err) => {
        res.status(500);
        return next();
      });
  }
}
