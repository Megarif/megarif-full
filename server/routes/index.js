const Route = require("express");
const route = new Route();
const userRoute = require("./userRouter");
const lessonsRoute = require("./lessonRouter");
const eventsRoute = require('./evetnsRouter');

route.use('/user', userRoute);
route.use('/lesson', lessonsRoute);
route.use('/event', eventsRoute);

module.exports = route;