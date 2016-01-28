'use strict';

var personsRepo = require('../repository/persons');
var meetingsRepo = require('../repository/meetings');
var utils = require('../utils');

/**
 * Express middleware for meeting model
 * @type {{insert: Function, count: Function, findUpcoming: Function}}
 */
module.exports = {
  insert: function (req, res, next) {

    // request validation
    if (!req.body.random) {
      res.status(400).json({error: 'random parameter is required'});
      return next();
    }

    var countOfMeetingsToInsert = parseInt(req.body.random);
    if (isNaN(countOfMeetingsToInsert)) {
      res.status(400).json({error: 'random parameter should be an integer'});
      return next();
    }

    if (!req.body.topic) {
      res.status(400).json({error: 'topic parameter is required for random meetings generation'});
      return next();
    }

    personsRepo.findAll()
      .then((persons) => {
        var meetings = utils.generateRandomMeetings(countOfMeetingsToInsert, req.body.topic, persons);
        return meetingsRepo.insert(meetings);
      })
      .then(() => {
        res.status(201).json({message: countOfMeetingsToInsert + ' meetings inserted'});
        return next();
      })
      .catch((err) => {
        res.status(500);
        return next();
      });
  },

  count: function (req, res, next) {
    meetingsRepo.count()
      .then((count) => {
        res.status(200).json(count);
        return next();
      })
      .catch((err) => {
        res.status(500);
        return next();
      });
  },

  findUpcoming: function (req, res, next) {
    //default limit
    let limit = 10;

    if (req.query.limit) {
      limit = parseInt(req.query.limit);
    }

    meetingsRepo.findUpcoming({
      limit: limit
    })
      .then((meetings) => {
        res.status(200).json(meetings);
        return next();
      })
      .catch((err) => {
        res.status(500);
        return next();
      });
  }
}
