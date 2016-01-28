'use strict';

var personsRepo = require('../repository/personsRepo');
var meetingsRepo = require('..repository/meetingsRepo');
var utils = require('../utils');

module.exports = {
  insert: function (req, res, next) {
    if (!req.body.random) {
      res.status(400).json({error: 'random parameter is required'});
      return next();
    }

    var countOfMeetingsToInsert = parseInt(req.body.random);
    if (isNaN(countOfMeetingsToInsert)) {
      res.status(400).json({error: 'random parameter should be an integer'});
      return next();
    }

    personsRepo.findAll()
      .then((persons) => {
        var meetings = utils.generateRandomMeetings(countOfMeetingsToInsert, persons);
        return meetingsRepo.insert(meetings);
      })
      .then(() => {
        res.status(201);
        next();
      })
      .catch((err) => {
        res.status(500);
      });
  }
}
