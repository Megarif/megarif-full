const Route = require("express");
const route = new Route();
const userController = require('../controller/userController');
const authMiddleware = require("../middleware/authMidlleware");


route.post("/registration", userController.registration);
route.post("/login", userController.login);
route.get("/auth", userController.check);
route.get("/info", authMiddleware, userController.userInfo);
route.post("/downloadImg", authMiddleware, userController.addImgForUser);
route.post('/hp', userController.hp);


module.exports = route;


