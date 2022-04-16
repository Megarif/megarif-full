const Route = require("express");
const route = new Route();
const userController = require('../controller/userController');
const authMiddleware = require("../middleware/authMidlleware");


route.post("/registration", userController.registration);
route.post("/login", userController.login);
route.get("/auth", userController.check);
route.get("/info", authMiddleware, userController.userInfo);
route.post("/downloadImg", authMiddleware, userController.addImgForUser);
route.post('/hp', authMiddleware, userController.hp);
route.post('/upXp', authMiddleware, userController.updateXp);
route.post('/learned_lesson', authMiddleware, userController.saveLessons);

module.exports = route;