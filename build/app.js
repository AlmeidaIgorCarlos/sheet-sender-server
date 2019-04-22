"use strict";

var app = require('express')();

require('dotenv-safe').config();

var consign = require('consign');

consign().include('./src/config/middlewares.js').then('./src/routes/').into(app);
app.listen(process.env.PORT);