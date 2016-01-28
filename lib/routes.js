'use strict';
var meetingsController = require('./controller/meetings');

module.exports = function(app) {
  app.post('/api/meetings', meetingsController.insert);
  app.get('/api/meetings', meetingsController.findUpcoming);
  app.get('/api/meetings/count', meetingsController.count);
};
