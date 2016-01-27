'use strict';

const Promise = require('bluebird');
const db = require('./db');

const meetings = db().collection('meetings');
//Promise.promisifyAll(meetings);

module.exports = {
  insert: function (items, callback) {
    meetings.insert(items, callback);
  },
  findUpcoming: function(limit, callback){
    if (!limit) {
      limit = 0;
    }

    meetings.find({"start" : { $gte : new Date() }})
      .limit(limit)
      .sort({"start": 1}, callback);
  }
};
