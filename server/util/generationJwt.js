const jwt = require("jsonwebtoken");

const generationJwt = (id, login) => jwt.sign({id, login}, process.env.SECRET_KEY, {expiresIn: "24h"})


module.exports = generationJwt;