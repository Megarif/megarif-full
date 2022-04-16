const Route = require("express");
const route = new Route();

const LessonsController = require('../controller/lessonsController');

route.get('/allLessons', LessonsController.getAllLessons);
route.post('/createLesson', LessonsController.createLeassons);

module.exports = route;