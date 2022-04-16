const bqcrypt = require('bcrypt');
const ApiError = require("../error/Apierror");
const {User} = require("../models/models");
const uuid = require('uuid');
const generationJwt = require("../util/generationJwt");
const path = require("path");


class UserController {
    async registration(req, res, next) {
        const {login, username, password} = req.body;
        if (!login || !password || !username) {
            return next(ApiError.noRequest("Некорректные данные авторизации"));
        }
        const checkEmail = await User.findOne({where: {login: login}});
        if (checkEmail) {
            return next(ApiError.noRequest("Такой пользователь с данной почтой уже существует"));
        }
        const checkUserName = await User.findOne({where: {username: username}});
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
        const user = await User.findOne({where: {login: login}});
        if (!user) {
            return next(ApiError.internal("login не найден"));
        }

        const comparePassword = bqcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.noRequest("Пароли не совпадают"));
        }
        const authUser = await User.findOne({attributes: {exclude: ['password']}, where: {login: login}})
        const token = generationJwt(user.id, user.login);
        res.json({token, authUser});
    }


    async userInfo(req, res) {
        const {id} = req.query;
        const getInfo = await User.findOne({where: {id: id}});
        return res.json(getInfo);
    }

    async addImgForUser(req, res) {
        try {
            const {id} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const loadingImg = await User.update({fileName: fileName}, {where: {id}});
            return res.json(loadingImg);
        } catch (error) {
            return error;
        }
    }

    async hp(req, res) {
        const {id, hp} = req.body;
        const updateUser = await User.update({hp}, {where: {id}});
        res.json(updateUser);
    }


}

module.exports = new UserController();

