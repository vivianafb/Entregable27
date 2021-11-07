import { Router } from "express";
import productoRouter from './productos';
import userRouter from './user';
import passport from '../middlewares/auth';
import { isLoggedIn } from '../middlewares/auth';
import { Argumentos } from "../middlewares/auth";
import { fork } from 'child_process';
import path from 'path';
import randoms from '../utils/calculo.js';
import os from 'os';
import { portArg } from "../middlewares/args";
const router = Router();

router.use('/productos',productoRouter);

router.get('/', (req, res) => {
  res.json({
    pid: process.pid,
    msg: `HOLA desde puerto ${portArg}`,
    });
});

router.get('/info', (req, res) => {
  res.json({
    'Argumentos de entrada': Argumentos,
    'Nombre de la plataforma': process.platform,
    'Versión de node.js': process.version,
    'Uso de memoria': process.memoryUsage(),
    'Path de ejecución': process.cwd(),
    'Process id': process.pid,
    'Carpeta corriente': process.execPath,
    'Numero de procesadores': os.cpus().length
  });
});
const scriptPath = path.resolve(__dirname, '../utils/calculo.js');

router.get('/randoms', (req, res) => {
  let num;
  req.query.cant ? (num = Number(req.query.cant)) : 100000000;
  const computo = fork(scriptPath);
  const msg = { msg: 'start', cantidad: num };
  computo.send(JSON.stringify(msg));
  computo.on('message', (result) => {
    res.json(result);
  });
});

router.get('/registro', (req, res) => {
  res.render('registro')
});

router.get('/iniciosesion', (req, res) => {
  res.render('inicio')
});

router.get('/loginFacebook', (req, res) => {
  res.render('loginFacebook');
});

router.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/api/datos',
    failureRedirect: '/api/fail',
  })
);

router.get('/fail', (req, res) => {
  res.render('login-error', {});
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/api/loginFacebook');
});

router.get('/datos', (req, res) => {
  let foto = 'noPhoto';
  let email = 'noEmail';

  if (req.isAuthenticated()) {
    const userData = req.user;
    //reinicio contador
    if (!userData.contador) userData.contador = 0;
    userData.contador++;

    if (userData.photos) foto = userData.photos[0].value;

    if (userData.emails) email = userData.emails[0].value;

    res.render('datos', {
      nombre: userData.displayName,
      contador: userData.contador,
      foto,
      email,
    });
  } else {
    res.redirect('/api/login');
  }
});

router.post('/login', (req, res,next) =>{
  passport.authenticate('login', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) return res.render('loginerr');

    const usern = user.username
    res.render('main',{usern});
  })(req, res, next);
  });
  
router.post('/signup', (req, res, next) => {
    passport.authenticate('signup', function (err, user, info) {
    //   console.log(err, user, info);
      if (err) {
        return next(err);
      }
      if (!user) return res.render('registererr');
  
      res.render('inicio');
    })(req, res, next);
});
  
  
router.use('/users', isLoggedIn, userRouter);
export default router;