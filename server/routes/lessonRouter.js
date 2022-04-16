const Route = require("express");
const route = new Route();

const LessonsController = require('../controller/lessonsController');
const authMiddleware = require("../middleware/authMidlleware");

route.get('/all', LessonsController.getAllLessons);
route.post('/createLesson', authMiddleware, LessonsController.createLeassons);
route.get('/current', LessonsController.getCurrentLessons);

module.exports = route;