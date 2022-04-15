const bqcrypt = require('bcrypt');
const ApiError = require("../error/Apierror");
const {User} = require("../models/models");
const generationJwt = require("../util/generationJwt");

class UserController {
    async registration(req, res, next) {
        const {login, username, password} = req.body;
        if (!login || !password || !username) {
            return next(ApiError.noRequest("Некорректные данные авторизации"));
        }
        const checkEmail = await User.findOne({where: {login}});
        if (checkEmail) {
            return next(ApiError.noRequest("Такой пользователь с такой почтой уже существует"));
        }
        const checkUserName = await User.findOne({where: {username}});
        if (checkUserName) {
            return next(ApiError.noRequest("Такой пользователь с таким именем уже существует"));
        }
        const hasPassword = await bqcrypt.hash(password, 3);
        const user = await User.create({login, password: hasPassword})
        const token = generationJwt(user.id, user.login)
        res.json(token);
    }

    async check(req, res, next) {
        const token = generationJwt(req.user.id, req.user.login);
        res.json({token});
    }


    async login(req, res, next) {
        const {login, password} = req.body;
        const user = await User.findOne({where: {login}})
        if (!user) {
            return next(ApiError.internal("login не найден"));
        }
        const comparePassword = bqcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.noRequest("Пароли не совпадают"));
        }
        const token = generationJwt(user.id, user.login);
        res.json(token);
    }

    async userInfo(req, res) {
        const {id} = req.query;
        const getTodo = await User.findOne({where: {id}});
        res.json(getTodo);
    }
}

module.exports = new UserController();
