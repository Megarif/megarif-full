const Route = require("express");
const route = new Route();

const LessonsController = require('../controller/lessonsController');
const authMiddleware = require("../middleware/authMidlleware");

route.get('/allLessons', LessonsController.getAllLessons);
route.post('/createLesson', LessonsController.createLeassons);
route.get('/leasson', authMiddleware, LessonsController.getCurrentLessons);

module.exports = route;