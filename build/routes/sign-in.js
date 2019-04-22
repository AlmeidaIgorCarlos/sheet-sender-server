"use strict";

var express = require('express');

var router = express.Router();

module.exports = function (app) {
  router.post('/sign-in', function (req, res, next) {
    try {} catch (error) {} finally {
      next();
    }
  });
  app.use('/', router);
};