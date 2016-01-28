'use strict';

/**
 * Meetings repository. Abstraction for database operations with meetings
 */

const db = require('./db');
const meetings = db().collection('meetings');

module.exports = {

  /**
   * Inserts meetings into database
   * @param items
   * @returns {Promise}
   */
  insert: function (items) {
    return new Promise(function (resolve, reject) {
      meetings.insert(items, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  },

  /**
   * Returns an array of upcoming meetings which match criteria specified in the options parameter in the callback param
   * @param options
   * options.limit {<Number>}, optional, Results count will be limited to this value
   * options.persons {Array <String>}, optional. Persons should participate meeting
   * @returns {Promise}
   */
  findUpcoming: function (options) {
    return new Promise(function (resolve, reject) {
      if (!options) {
        options = {};
      }

      if (!options.limit) {
        options.limit = 0;
      }

      let findPart;

      if (options.persons) {
        findPart = meetings.find({
          'start': {$gte: new Date()},
          'persons': {$elemMatch: {$in: options.persons}}
        });
      } else {
        findPart = meetings.find({'start': {$gte: new Date()}});
      }

      findPart
        .sort({'start': 1})
        .limit(options.limit, (err, items) => {
          if (err) return reject(err);
          resolve(items);
        });
    });
  },

  /**
   * Returns total count of meetings in callback param
   * @returns {Promise}
   */
  count: function () {
    return new Promise(function (resolve, reject) {
      meetings.count((err, count) => {
        if (err) return reject(err);
        resolve(count);
      });
    });
  }
};
