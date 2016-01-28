'use strict';
var meetingsController = require('./controller/meetings');

module.exports = function(app) {
  app.post('/api/meetings', meetingsController.insert);
};
