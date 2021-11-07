import { Router } from "express";
import productoRouter from './productos';
import userRouter from './user';
import passport from '../middlewares/auth';
import { isLoggedIn } from '../middlewares/auth';
import { Email } from '../services/email';
import { Gmail } from "../services/gmail";
import { SmsService } from "../services/twilio";
import Config from '../config';
const router = Router();

router.use('/productos',productoRouter);

router.post('/send-message', async (req, res) => {
  const { body } = req;

  if (!body || !body.destination || !body.content)
    return res.status(400).json({
      msg: "mandame en el body el 'destination' y el 'content'",
      body,
    });

  try {
    const response = await SmsService.sendMessage(
      body.destination,
      body.content
    );

    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/loginFacebook', (req, res) => {
  res.render('loginFacebook');
});

router.get('/auth/facebook',
  passport.authenticate('facebook', {
     scope: ['email'] ,
    })
);

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/api/datos',
    failureRedirect: '/api/fail',
  })
);

router.get('/fail', (req, res) => {
  res.render('login-error', {});
});

// router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/api/loginFacebook');
// });

router.get('/logout', (req, res) => {
  if (req.isAuthenticated()) {
    const etherealService = new Email('ethereal');
    const userData = req.user;

    const content = `<h1> ${userData.displayName}</h1><p>Fecha y hora del logOut:${new Date()}<p>`;
    etherealService.sendEmail(Config.ETHEREAL_EMAIL, 'LogOut', content);
  }
  req.session.destroy(err => {
    if (err) res.status(500).json({ message: 'Ocurrió un error' });
    else {
      res.json({ message: 'Logout exitoso' });
    }
  });
});

router.get('/datos', (req, res) => {
  let foto = 'noPhoto';
  let email = 'noEmail';

  if (req.isAuthenticated()) {
    const etherealService = new Email('ethereal');
    const gmailService = new Gmail('gmail');

    const userData = req.user;

    


    if (!userData.contador) userData.contador = 0;
    userData.contador++;

    if (userData.photos) foto = userData.photos[0].value;

    if (userData.emails) email = userData.emails[0].value;

    const content = `<h1> ${userData.displayName}</h1><p>Fecha y Hora del LogIn: ${new Date()}</p>`;
    const content2= ` Foto de perfil: ${userData.photos[0].value}`;
    etherealService.sendEmail(Config.ETHEREAL_EMAIL, 'LogIn', content);
    gmailService.sendEmail(email, 'LogIn', content2);

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