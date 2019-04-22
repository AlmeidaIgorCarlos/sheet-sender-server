"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var request = require('request');

require('dotenv-safe').config();

module.exports = {
  insertWorkItem: function insertWorkItem(workItem) {
    return new Promise(function (resolve, reject) {
      if ((0, _typeof2["default"])(workItem) !== 'object') reject(new Error('The parameter for the insertWorkItem must be an object'));else if ((0, _typeof2["default"])(workItem.user) !== 'object') reject(new Error('The parameter for the insertWorkItem must have an user inner object'));else {
        workItem.entity = 'workitem';
        workItem.date = new Date();
        var requestData = {
          method: 'POST',
          uri: "http://".concat(process.env.DATABASE_URL, ":").concat(process.env.DATABASE_PORT, "/").concat(process.env.DATABASE),
          body: workItem,
          json: true
        };
        request(requestData, function (error, res) {
          if (error) reject(error);else {
            if (res.statusCode != 201) reject(res.statusCode);else resolve(res.statusCode);
          }
        });
      }
    });
  },
  getWorkItem: function getWorkItem(_user) {
    return new Promise(function (resolve, reject) {
      if ((0, _typeof2["default"])(_user) !== 'object') reject(new Error('The parameter for the getWorkItem must be an object'));else {
        var requestData = {
          method: 'POST',
          uri: "http://".concat(process.env.DATABASE_URL, ":").concat(process.env.DATABASE_PORT, "/").concat(process.env.DATABASE, "/_find"),
          body: {
            selector: {
              entity: 'workitem',
              user: _user
            }
          },
          json: true
        };
        request(requestData, function (error, res, body) {
          if (error) reject(error);else {
            if (res.statusCode != 200) reject(res.statusCode);else {
              resolve(body);
            }
          }
        });
      }
    });
  },
  updateWorkItem: function updateWorkItem(workItem) {
    return new Promise(function (resolve, reject) {
      if ((0, _typeof2["default"])(workItem) !== 'object') reject(new Error('The parameter for the updateWorkItem must be an object'));else if ((0, _typeof2["default"])(workItem.user) !== 'object') reject(new Error('The parameter for the insertWorkItem must have an user inner object'));else if (typeof workItem._id === 'undefined') reject(new Error('The parameter for the updateWorkItem must have an _id inner attribute'));else if (typeof workItem._rev === 'undefined') reject(new Error('The parameter for the updateWorkItem must have an _rev inner attribute'));else {
        var requestData = {
          method: 'PUT',
          uri: "".concat(process.env.DATABASE_URL, ":").concat(process.env.DATABASE_PORT, "/").concat(process.env.DATABASE, "/").concat(workItem._id),
          body: workItem,
          json: true
        };
        request(requestData, function (error, res, body) {
          if (error) reject(error);else {
            if (res.statusCode != 201) reject(res.statusCode);else resolve(res.statusCode);
          }
        });
      }
    });
  }
};