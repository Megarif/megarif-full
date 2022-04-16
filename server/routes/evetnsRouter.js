const Route = require('express');

const route = new Route();

const EventController = require('../controller/eventController');

route.get('/env', EventController.getAllEvents);
route.post('/add', EventController.createEvents);


module.exports = route;