const {Events} = require('../models/models');
const ApiError = require("../error/Apierror");
const path = require("path");
const uuid = require('uuid');

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
        const {img} = req.files;
        if (!name || !status || !description) {
            return next(ApiError.noRequest('Ошибка'));
        }
        let filename = uuid.v4() + '.jpg';
        img.mv(path)
        const createEvent = await Events.create({name, userId, description})
        res.json(createEvent);
    }

}

module.exports = new EventController();