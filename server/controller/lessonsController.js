const {Lessons} = require("../models/models");


class LessonsController {
    async getAllLessons(req, res) {
        const getLessons = await Lessons.findAll({});
        res.json(getLessons);
    }


}

module.exports = new LessonsController();