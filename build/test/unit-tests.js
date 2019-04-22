"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var assert = require('chai').assert;

var auth = require('./../services/auth');

var userDatabase = require('./../services/database/user');

var workItemDatabase = require('./../services/database/work-item');

describe('Service | auth', function () {
  it('authenticate method | auth property | giving all the parameters correctly, the auth must be true',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var authentication;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return auth.authenticate({
              id: 1
            });

          case 2:
            authentication = _context.sent;
            assert(authentication.auth);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it('authenticate method | token property | giving all parameters correctly, the token must be non-null',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var authentication;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return auth.authenticate({
              id: 1
            });

          case 2:
            authentication = _context2.sent;
            assert(authentication.token);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it('authenticate method | incorrect parameter | as incorrect parameters are delivered, an error is expected',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return auth.authenticate('error');

          case 3:
            _context3.next = 8;
            break;

          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3["catch"](0);
            assert(_context3.t0.message.includes('user must be an object'));

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 5]]);
  })));
  it('signOut method test | auth property', function () {
    var authentication = auth.signOut();
    assert(authentication.auth === false);
  });
  it('signOut method test | token property', function () {
    var authentication = auth.signOut();
    assert(authentication.token == false);
  });
  it('authorize method | giving token to receive authorization | authorization granted', function () {
    auth.authenticate({
      id: 1
    }).then(
    /*#__PURE__*/
    function () {
      var _ref4 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(authentication) {
        var authorization;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return auth.authorize(authentication);

              case 2:
                authorization = _context4.sent;
                assert(authorization === true);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x) {
        return _ref4.apply(this, arguments);
      };
    }());
  });
  it('authorize method | giving token to receive authorization | as auth is false, an error is generated',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee5() {
    var authentication;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            authentication = {
              token: 'non-null',
              auth: false
            };
            _context5.prev = 1;
            _context5.next = 4;
            return auth.authorize(authentication);

          case 4:
            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5["catch"](1);
            assert(_context5.t0.message === 'The state of the authentication is false');

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 6]]);
  })));
  it('authorize method | giving token to receive authorization | as token is null, an error is generated',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee6() {
    var authentication;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            authentication = {
              //token: '',
              auth: true
            };
            _context6.prev = 1;
            _context6.next = 4;
            return auth.authorize(authentication);

          case 4:
            _context6.next = 9;
            break;

          case 6:
            _context6.prev = 6;
            _context6.t0 = _context6["catch"](1);
            assert(_context6.t0.message === "The token's format is incorrect");

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 6]]);
  })));
});
describe('Service | user', function () {
  it('insertUser | Incorrect parameters | Must return an error because the parameter is wrong',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee7() {
    var user;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            user = 'No object';
            _context7.next = 4;
            return userDatabase.insertUser(user);

          case 4:
            _context7.next = 9;
            break;

          case 6:
            _context7.prev = 6;
            _context7.t0 = _context7["catch"](0);
            assert(_context7.t0.message === 'The parameter to the insertUser function must be an JSON object');

          case 9:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 6]]);
  })));
  it('insertUser | No parameters | Must return an error because no paramater is provided',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee8() {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return userDatabase.insertUser();

          case 3:
            _context8.next = 8;
            break;

          case 5:
            _context8.prev = 5;
            _context8.t0 = _context8["catch"](0);
            assert(_context8.t0.message === 'The parameter to the insertUser function must be an JSON object');

          case 8:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 5]]);
  })));
  it('getUser | Incorrect parameter | Must return an error because we are informing an string',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee9() {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return userDatabase.getUser('igor');

          case 3:
            _context9.next = 8;
            break;

          case 5:
            _context9.prev = 5;
            _context9.t0 = _context9["catch"](0);
            assert(_context9.t0.message === 'The parameter for the getUser function must be an object');

          case 8:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 5]]);
  })));
  it('getUser | Incorrect parameter | Must return an error because no parameter is provided',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee10() {
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return userDatabase.getUser();

          case 3:
            _context10.next = 8;
            break;

          case 5:
            _context10.prev = 5;
            _context10.t0 = _context10["catch"](0);
            assert(_context10.t0.message === 'The parameter for the getUser function must be an object');

          case 8:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 5]]);
  })));
  it('getUserById | Incorrect parameter | Must return an error because the parameter type is not string',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee11() {
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _context11.next = 3;
            return userDatabase.getUserbyId(1);

          case 3:
            _context11.next = 8;
            break;

          case 5:
            _context11.prev = 5;
            _context11.t0 = _context11["catch"](0);
            assert(_context11.t0.message === 'The parameter for the getUserById function must be an string');

          case 8:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 5]]);
  })));
  it('updateUser | Incorrect parameter type | Must return an error because the parameter type is incorrect',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee12() {
    var user;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            user = '';
            _context12.next = 4;
            return userDatabase.updateUser(user);

          case 4:
            _context12.next = 9;
            break;

          case 6:
            _context12.prev = 6;
            _context12.t0 = _context12["catch"](0);
            assert(_context12.t0.message === 'The parameter for the updateUser function must be an object');

          case 9:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[0, 6]]);
  })));
  it('updateUser | Incorrect parameter type | Must return an error because the parameter does not have the _rev attribute',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee13() {
    var user;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            user = {
              name: 'testuser'
            };
            _context13.next = 4;
            return userDatabase.updateUser(user);

          case 4:
            _context13.next = 9;
            break;

          case 6:
            _context13.prev = 6;
            _context13.t0 = _context13["catch"](0);
            assert(_context13.t0.message === 'The user parameter must have a valid _rev attribute');

          case 9:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 6]]);
  })));
  it('updateUser | Incorrect parameter type | Must return an error because the parameter does not have the _id attribute',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee14() {
    var user;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            user = {
              name: 'testuser',
              _rev: 'non-null'
            };
            _context14.next = 4;
            return userDatabase.updateUser(user);

          case 4:
            _context14.next = 9;
            break;

          case 6:
            _context14.prev = 6;
            _context14.t0 = _context14["catch"](0);
            assert(_context14.t0.message === 'The user parameter must have a valid _id attribute');

          case 9:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[0, 6]]);
  })));
  it('updateUser | Incorrect parameter | Must return an error because no parameter is provided',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee15() {
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            _context15.next = 3;
            return userDatabase.updateUser();

          case 3:
            _context15.next = 8;
            break;

          case 5:
            _context15.prev = 5;
            _context15.t0 = _context15["catch"](0);
            assert(_context15.t0.message === 'The parameter for the updateUser function must be an object');

          case 8:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[0, 5]]);
  })));
});
describe('Service | work-item', function () {
  it('insertWorkItem | Must return an error, since the parameter is wrong',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee16() {
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            _context16.next = 3;
            return workItemDatabase.insertWorkItem();

          case 3:
            _context16.next = 8;
            break;

          case 5:
            _context16.prev = 5;
            _context16.t0 = _context16["catch"](0);
            assert(_context16.t0.message === 'The parameter for the insertWorkItem must be an object');

          case 8:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[0, 5]]);
  })));
  it('insertWorkItem | Must return an error, because the object parameter must have an user inner object',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee17() {
    var workItem;
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            workItem = {
              name: 'non-null'
            };
            _context17.next = 4;
            return workItemDatabase.insertWorkItem(workItem);

          case 4:
            _context17.next = 9;
            break;

          case 6:
            _context17.prev = 6;
            _context17.t0 = _context17["catch"](0);
            assert(_context17.t0.message === 'The parameter for the insertWorkItem must have an user inner object');

          case 9:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, null, [[0, 6]]);
  })));
  it('getWorkItem | Must return an error, since the parameter is wrong',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee18() {
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            _context18.next = 3;
            return workItemDatabase.getWorkItem();

          case 3:
            _context18.next = 8;
            break;

          case 5:
            _context18.prev = 5;
            _context18.t0 = _context18["catch"](0);
            assert(_context18.t0.message === 'The parameter for the getWorkItem must be an object');

          case 8:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, null, [[0, 5]]);
  })));
  it('updateWorkItem | must return an error, since the parameter type is wrog',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee19() {
    return _regenerator["default"].wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.prev = 0;
            _context19.next = 3;
            return workItemDatabase.updateWorkItem();

          case 3:
            _context19.next = 8;
            break;

          case 5:
            _context19.prev = 5;
            _context19.t0 = _context19["catch"](0);
            assert(_context19.t0.message === 'The parameter for the updateWorkItem must be an object');

          case 8:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19, null, [[0, 5]]);
  })));
  it('updateWorkItem | must return an error, because the function updateWorkItem has to have a user inner object',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee20() {
    var workItem;
    return _regenerator["default"].wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.prev = 0;
            workItem = {
              _id: 'non-null'
            };
            _context20.next = 4;
            return workItemDatabase.updateWorkItem(workItem);

          case 4:
            _context20.next = 9;
            break;

          case 6:
            _context20.prev = 6;
            _context20.t0 = _context20["catch"](0);
            assert(_context20.t0.message === 'The parameter for the insertWorkItem must have an user inner object');

          case 9:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20, null, [[0, 6]]);
  })));
  it('updateWorkItem | must return an error, since the parameter has no _id inner attribute',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee21() {
    var workItem;
    return _regenerator["default"].wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.prev = 0;
            workItem = {
              user: {}
            };
            _context21.next = 4;
            return workItemDatabase.updateWorkItem(workItem);

          case 4:
            _context21.next = 9;
            break;

          case 6:
            _context21.prev = 6;
            _context21.t0 = _context21["catch"](0);
            assert(_context21.t0.message === 'The parameter for the updateWorkItem must have an _id inner attribute');

          case 9:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21, null, [[0, 6]]);
  })));
  it('updateWorkItem | must return an error, since the parameter has no _rev inner attribute',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee22() {
    var workItem;
    return _regenerator["default"].wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            _context22.prev = 0;
            workItem = {
              _id: 'non-null',
              user: {}
            };
            _context22.next = 4;
            return workItemDatabase.updateWorkItem(workItem);

          case 4:
            _context22.next = 9;
            break;

          case 6:
            _context22.prev = 6;
            _context22.t0 = _context22["catch"](0);
            assert(_context22.t0.message === 'The parameter for the updateWorkItem must have an _rev inner attribute');

          case 9:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22, null, [[0, 6]]);
  })));
});