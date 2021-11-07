"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _productos = _interopRequireDefault(require("./productos"));

var _user = _interopRequireDefault(require("./user"));

var _auth = _interopRequireWildcard(require("../middlewares/auth"));

var _email = require("../services/email");

var _config = _interopRequireDefault(require("../config"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.use('/productos', _productos.default);
router.post('/send-email', async (req, res) => {
  const {
    body
  } = req;
  const destination = _config.default.ETHEREAL_EMAIL;
  const subject = 'LogIn';
  const content = `
  <h1>LogIn</h1>
  <p>Acabas de loguearte con facebook!</p>
  `;

  try {
    const response = await EmailService.sendEmail(destination, subject, content);
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/loginFacebook', (req, res) => {
  res.render('loginFacebook');
});
router.get('/auth/facebook', _auth.default.authenticate('facebook', {
  scope: ['email']
}));
router.get('/auth/facebook/callback', _auth.default.authenticate('facebook', {
  successRedirect: '/api/datos',
  failureRedirect: '/api/fail'
}));
router.get('/fail', (req, res) => {
  res.render('login-error', {});
}); // router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/api/loginFacebook');
// });

router.get('/logout', (req, res) => {
  if (req.isAuthenticated()) {
    const etherealService = new _email.Email('ethereal');
    const userData = req.user;
    const content = `<h1> ${userData.displayName}</h1><p>Fecha y hora del logOut:${new Date()}<p>`;
    etherealService.sendEmail(_config.default.ETHEREAL_EMAIL, 'LogOut', content);
  }

  req.session.destroy(err => {
    if (err) res.status(500).json({
      message: 'Ocurrió un error'
    });else {
      res.json({
        message: 'Logout exitoso'
      });
    }
  });
});
router.get('/datos', (req, res) => {
  let foto = 'noPhoto';
  let email = 'noEmail';

  if (req.isAuthenticated()) {
    const etherealService = new _email.Email('ethereal');
    const userData = req.user;
    const content = `<h1> ${userData.displayName}</h1><p>Fecha y Hora del LogIn: ${new Date()}</p>`;
    etherealService.sendEmail(_config.default.ETHEREAL_EMAIL, 'LogIn', content);
    if (!userData.contador) userData.contador = 0;
    userData.contador++;
    if (userData.photos) foto = userData.photos[0].value;
    if (userData.emails) email = userData.emails[0].value;
    res.render('datos', {
      nombre: userData.displayName,
      contador: userData.contador,
      foto,
      email
    });
  } else {
    res.redirect('/api/login');
  }
});
router.post('/login', (req, res, next) => {
  _auth.default.authenticate('login', function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) return res.render('loginerr');
    const usern = user.username;
    res.render('main', {
      usern
    });
  })(req, res, next);
});
router.post('/signup', (req, res, next) => {
  _auth.default.authenticate('signup', function (err, user, info) {
    //   console.log(err, user, info);
    if (err) {
      return next(err);
    }

    if (!user) return res.render('registererr');
    res.render('inicio');
  })(req, res, next);
});
router.use('/users', _auth.isLoggedIn, _user.default);
var _default = router;
exports.default = _default;