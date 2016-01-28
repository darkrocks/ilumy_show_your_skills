'use strict';

const utils = require('../../lib/utils');

module.exports = [
  {
    topic: 'meeting-day-after-tomorrow',
    start: utils.getDateInFuture(2),
    persons: [
      'chuck',
      'jackie'
    ]
  },
  {
    topic: 'meeting-after-3-days',
    start: utils.getDateInFuture(3),
    persons: [
      'chuck',
      'arnold',
      'jackie'
    ]
  },
  {
    topic: 'meeting-tomorrow',
    start: utils.getDateInFuture(1),
    persons: [
      'jackie'
    ]
  },
  {
    topic: 'meeting-yesterday',
    start: utils.getDateInFuture(-1),
    persons: [
      'chuck',
      'arnold'
    ]
  }
];
