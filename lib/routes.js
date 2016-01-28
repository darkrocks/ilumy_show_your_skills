'use strict';
var meetingsController = require('./controller/meetings');
var personsController = require('./controller/persons');

module.exports = function(app) {
  app.post('/api/meetings', meetingsController.insert);
  app.get('/api/meetings', meetingsController.findUpcoming);
  app.get('/api/meetings/count', meetingsController.count);
  app.get('/api/persons', personsController.findAll);
};
