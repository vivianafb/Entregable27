"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.isLoggedIn = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = _interopRequireDefault(require("passport-local"));

var _user = require("../models/user");

var _passportFacebook = _interopRequireDefault(require("passport-facebook"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LocalStrategy = _passportLocal.default.Strategy;
const FaceBookStrategy = _passportFacebook.default.Strategy;
const strategyOptions = {
  clientID: _config.default.FACEBOOK_APP_ID,
  clientSecret: _config.default.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:8080/api/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'emails']
};

const loginFunc = async (accessToken, refreshToken, profile, done) => {
  console.log('SALIO TODO BIEN');
  console.log(accessToken);
  console.log(refreshToken);
  console.log(profile);
  return done(null, profile);
};

_passport.default.use(new FaceBookStrategy(strategyOptions, loginFunc));

_passport.default.serializeUser(function (user, cb) {
  cb(null, user);
});

_passport.default.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

const isLoggedIn = (req, res, done) => {
  if (!req.isAuthenticated()) return res.status(401).json({
    msg: 'Unathorized'
  });
  done();
};

exports.isLoggedIn = isLoggedIn;
var _default = _passport.default;
exports.default = _default;