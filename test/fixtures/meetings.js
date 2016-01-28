'use strict';

const utils = require('../../lib/utils');

module.exports = [
  {
    topic: 'meeting-day-after-tomorrow',
    start: utils.getDateInFuture(2),
    persons: [
      'Chuck',
      'Jackie'
    ]
  },
  {
    topic: 'meeting-after-3-days',
    start: utils.getDateInFuture(3),
    persons: [
      'Chuck',
      'Arnold',
      'Jackie'
    ]
  },
  {
    topic: 'meeting-tomorrow',
    start: utils.getDateInFuture(1),
    persons: [
      'Jackie'
    ]
  },
  {
    topic: 'meeting-yesterday',
    start: utils.getDateInFuture(-1),
    persons: [
      'Chuck',
      'Arnold'
    ]
  }
];
