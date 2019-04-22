"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var request = require('request');

require('dotenv-safe').config();

module.exports = {
  insertUser: function insertUser(user) {
    return new Promise(function (resolve, reject) {
      if ((0, _typeof2["default"])(user) !== 'object') reject(new Error('The parameter to the insertUser function must be an JSON object'));else {
        user.entity = 'user';
        var requestData = {
          method: 'POST',
          uri: "".concat(process.env.DATABASE_URL, "/").concat(process.env.DATABASE_NAME),
          body: user,
          json: true // Automatically stringifies the body to JSON

        };

        try {
          request.post(requestData, function (error, res) {
            if (error) reject(new Error("The database operation didn't work: ".concat(error)));else if (res.statusCode !== 201) reject(res.statusCode);else resolve(res.statusCode);
          });
        } catch (error) {
          reject(new Error("The database operation didn't work: ".concat(error)));
        }
      }
    });
  },
  getUser: function getUser(user) {
    return new Promise(function (resolve, reject) {
      if ((0, _typeof2["default"])(user) !== 'object') reject(new Error('The parameter for the getUser function must be an object'));else {
        user.entity = 'user';
        var requestData = {
          method: 'POST',
          uri: "".concat(process.env.DATABASE_URL, "/").concat(process.env.DATABASE_NAME, "/_find"),
          body: {
            selector: user
          },
          json: true // Automatically stringifies the body to JSON

        };

        try {
          request(requestData, function (error, res) {
            if (error) reject(error);else if (res.statusCode !== 200) reject(res.statusCode);else {
              var body = res.body;
              body.statusCode = res.statusCode;
              resolve(body);
            }
          });
        } catch (error) {
          reject(error);
        }
      }
    });
  },
  getUserbyId: function getUserbyId(_id) {
    return new Promise(function (resolve, reject) {
      if (typeof _id !== 'string') reject(new Error('The parameter for the getUserById function must be an string'));else {
        var url = "".concat(process.env.DATABASE_URL, "/").concat(process.env.DATABASE_NAME, "/").concat(_id);

        try {
          request(url, function (error, res) {
            if (error) reject(error);else if (res.statusCode !== 200) reject(res.statusCode);else {
              var body = res.body;
              body.statusCode = res.statusCode;
              resolve(body);
            }
          });
        } catch (error) {
          reject(error);
        }
      }
    });
  },
  updateUser: function updateUser(user) {
    return new Promise(function (resolve, reject) {
      if ((0, _typeof2["default"])(user) !== 'object') reject(new Error('The parameter for the updateUser function must be an object'));else if (user._rev === undefined) reject(new Error('The user parameter must have a valid _rev attribute'));else if (user._id === undefined) reject(new Error('The user parameter must have a valid _id attribute'));else {
        var requestData = {
          method: 'PUT',
          uri: "".concat(process.env.DATABASE_URL, "/").concat(process.env.DATABASE_NAME, "/").concat(user._id),
          body: user,
          json: true
        };
        request(requestData, function (error, res) {
          if (error) reject(error);else if (res.statusCode !== 201) reject(res.statusCode);else {
            resolve(res.statusCode);
          }
        });
      }
    });
  }
};