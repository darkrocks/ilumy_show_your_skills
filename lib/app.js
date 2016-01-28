'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes');

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../build'));
routes(app);
app.listen(3001, (err) => {
  if (err) return console.error(JSON.stringify(err));
  console.log('Listening on port 3001...');
});

module.exports = app;
