var test = require('../config.test'),
  production = require('../config');

module.exports = process.env.NODE_ENV === 'test' ?
  test :
  production;
