const {Events} = require('../models/models');
const ApiError = require("../error/Apierror");

class EventController {
    async getAllEvents(req, res) {
        const getEvents = await Events.findOne({});
        res.json(getEvents);
    }

    async createEvents(req, res, next) {
        try {

        } catch (error) {
            return "e";
        }
        const {name, status, description, userId} = req.body;
        const {images} = req.files;
        if (!name || !status || !description) {
            return next(ApiError.noRequest('Ошибка'));
        }
        const create = await Events.create({name, userId, description})
    }

}

module.exports = new EventController();