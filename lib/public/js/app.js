var angular = require('angular');
var LandingController = require('./LandingController');
var dataService = require('./dataService');

var app = angular.module('app', []);
app.controller('LandingController', LandingController);
app.factory('dataService', dataService);
