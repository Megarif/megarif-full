const sequelize = require('../db')
const {DataTypes, STRING} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true,},
    username: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    xp: {type: DataTypes.INTEGER},
    rating: {type: DataTypes.INTEGER}
});

const Lessons = sequelize.define('lessons', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    xp: {type: DataTypes.INTEGER},
    exercise: {type: DataTypes.JSONB},
});


module.exports = {User, Lessons};