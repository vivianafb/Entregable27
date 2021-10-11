import passport from 'passport';
import passportLocal from 'passport-local';
import { UserModel } from '../models/user';
import passportFacebook from 'passport-facebook';
import config from '../config';

const LocalStrategy = passportLocal.Strategy;
const FaceBookStrategy = passportFacebook.Strategy;

const strategyOptions = {
  clientID: config.FACEBOOK_APP_ID,
  clientSecret: config.FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:8080/api/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'emails'],
};

const loginFunc = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  console.log('SALIO TODO BIEN');
  console.log(accessToken);
  console.log(refreshToken);
  console.log(profile);
  return done(null, profile);
};

passport.use(new FaceBookStrategy(strategyOptions, loginFunc));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

export const isLoggedIn = (req, res, done) => {
  if (!req.isAuthenticated())
    return res.status(401).json({ msg: 'Unathorized' });

  done();
};

export default passport;