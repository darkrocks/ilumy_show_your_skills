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
   * @param callback
   */
  insert: function (items, callback) {
    meetings.insert(items, callback);
  },

  /**
   * Returns an array of upcoming meetings which match criteria specified in the options parameter in the callback param
   * @param options
   * options.limit {<Number>}, optional, Results count will be limited to this value
   * options.persons {Array <String>}, optional. Persons should participate meeting
   * @param callback
   */
  findUpcoming: function(options, callback) {
    if (!options) {
      options = {};
    }

    if (!options.limit) {
      options.limit = 0;
    }

    let findPart;

    if (options.persons) {
      findPart = meetings.find({
        'start' : { $gte : new Date() },
        'persons': { $elemMatch: { $in: options.persons } }
      });
    } else {
      findPart = meetings.find({'start' : { $gte : new Date() }});
    }

    findPart
      .limit(options.limit)
      .sort({'start': 1}, callback);
  },

  /**
   * Returns total count of meetings in callback param
   * @param callback
   */
  count: function (callback) {
    db.collection.count(callback);
  }
};
