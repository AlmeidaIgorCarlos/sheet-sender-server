"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var express = require('express');

var route = express.Router();

var userDatabase = require('./../services/database/user');

function getUser(req, approach) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(resolve, reject) {
      var body, user;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              body = req.body;

              if (!(approach === true)) {
                _context.next = 8;
                break;
              }

              _context.next = 5;
              return userDatabase.getUser(body);

            case 5:
              user = _context.sent;
              _context.next = 12;
              break;

            case 8:
              if (!(approach === false)) {
                _context.next = 12;
                break;
              }

              _context.next = 11;
              return userDatabase.getUserbyId(body._id);

            case 11:
              user = _context.sent;

            case 12:
              resolve(user);
              _context.next = 18;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](0);
              reject(_context.t0);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 15]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}

function isUserSaved(user) {
  if (user.docs.length === 0) return false;else return true;
}

module.exports = function (app) {
  route.post('/sign-up',
  /*#__PURE__*/
  function () {
    var _ref2 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(req, res, next) {
      var user;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return getUser(req, true);

            case 3:
              user = _context2.sent;

              if (isUserSaved(user)) {
                _context2.next = 12;
                break;
              }

              _context2.next = 7;
              return userDatabase.insertUser(req.body);

            case 7:
              _context2.t0 = _context2.sent;

              if (!(_context2.t0 === 201)) {
                _context2.next = 10;
                break;
              }

              res.writeHead(200);

            case 10:
              _context2.next = 13;
              break;

            case 12:
              res.writeHead(406);

            case 13:
              _context2.next = 18;
              break;

            case 15:
              _context2.prev = 15;
              _context2.t1 = _context2["catch"](0);
              res.writeHead(500);

            case 18:
              _context2.prev = 18;
              res.end();
              next();
              return _context2.finish(18);

            case 22:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 15, 18, 22]]);
    }));

    return function (_x3, _x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }());
  route.put('/sign-up',
  /*#__PURE__*/
  function () {
    var _ref3 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(req, res, next) {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return getUser(req, false);

            case 3:
              _context3.next = 5;
              return userDatabase.updateUser(req.body);

            case 5:
              _context3.next = 10;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              res.writeHead(500);

            case 10:
              _context3.prev = 10;
              res.end();
              next();
              return _context3.finish(10);

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 7, 10, 14]]);
    }));

    return function (_x6, _x7, _x8) {
      return _ref3.apply(this, arguments);
    };
  }());
  app.use('/', route);
};