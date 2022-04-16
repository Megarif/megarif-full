const sequelize = require('../db')
const {DataTypes, STRING} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true,},
    username: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    fileName: {type: DataTypes.STRING, defaultValue: null},
    hp: {type: DataTypes.DATE},
    xp: {type: DataTypes.INTEGER},
    rating: {type: DataTypes.INTEGER},
    coins: {type: DataTypes.INTEGER},
    leassonLearned: {type: DataTypes.STRING},
});

const Lessons = sequelize.define('lessons', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    fileName: {type: DataTypes.STRING},
    xp: {type: DataTypes.INTEGER},
    exercise: {type: DataTypes.JSONB},
    countExercise: {type: DataTypes.INTEGER},
});

const Events = sequelize.define('events', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    status: {type: DataTypes.STRING, defaultValue: 'Модерация'},
    description: {type: DataTypes.STRING},
    images: {type: DataTypes.JSONB},
});

User.hasOne(Events);


module.exports = {User, Lessons, Events};
