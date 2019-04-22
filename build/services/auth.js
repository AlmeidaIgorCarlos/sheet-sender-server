"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var JWT = require('jsonwebtoken');

require('dotenv-safe').config();

module.exports = {
  authenticate: function authenticate(user
  /*Object*/
  ) {
    return new Promise(function (resolve, reject) {
      if ((0, _typeof2["default"])(user) !== 'object') reject(new Error('user must be an object'));
      var token = JWT.sign(user, process.env.SECRET, {
        expiresIn: 1800 //expires in 30min

      });
      resolve({
        token: token,
        auth: true
      });
    });
  },
  signOut: function signOut() {
    return {
      token: '',
      auth: false
    };
  },
  authorize: function authorize(authentication) {
    return new Promise(function (resolve, reject) {
      if (authentication.auth === false) reject(new Error('The state of the authentication is false'));else if (!authentication.token) reject(new Error("The token's format is incorrect"));
      JWT.verify(authentication.token, process.env.SECRET, function (err) {
        if (err) reject(new Error('Ocurred an error during token verification'));else resolve(true);
      });
    });
  }
};