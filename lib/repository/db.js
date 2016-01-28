'use strict';

const mongojs = require('mongojs');
const config = require('../config');

const connectionString = config.mongo.server.addr + ':' + config.mongo.server.port + '/' + config.mongo.db;
let db;

/**
 * Returns cached database instance
 */
module.exports = function() {
  if (db) return db;
  return db = mongojs(connectionString);
};
