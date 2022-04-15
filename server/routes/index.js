const Route = require("express");
const route = new Route();
const userRoute = require("./userRouter");
const lessonsRoute = require("./lessonRouter");


route.use('/user', userRoute);
route.use('/lesson', lessonsRoute);

module.exports = route;