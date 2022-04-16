require('dotenv').config();
const express = require("express");
const route = require("./routes/index");
const sequelize = require("./db");
const fileUpload = require('express-fileupload');
const errorHandler = require("./middleware/ErrorHandingMiddleware");
const cors = require("cors");
const modules = require("./models/models");
const path = require('path');

const PORT = process.env.port || 8080;

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use("/api", route);


app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({alter: true})
        app.listen(PORT, () => console.log(`server starts...${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start()
