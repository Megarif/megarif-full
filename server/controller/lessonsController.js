const {Lessons} = require("../models/models");
const ApiError = require("../error/Apierror");
const path = require("path");
const uuid = require('uuid');


class LessonsController {
    async getAllLessons(req, res) {
        const getLessons = await Lessons.findAll({attributes: {exclude: ['exercise']}});
        res.json(getLessons);
    }

    async createLeassons(req, res, next) {
        try {
            const {name, xp, exercise, countExercise} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + ".ex";
            img.mv(path.resolve(__dirname, '..', fileName));
            if (!name || !xp || !exercise || !countExercise) {
                return next(ApiError.noRequest('Ошибка, запрос не пройден'));
            }
            const createLesson = await Lessons.create({name, fileName, xp, exercise, countExercise});
            res.json(createLesson.length);
        } catch (error) {
            return error;
        }
    }
}

module.exports = new LessonsController();