import dotenv from 'dotenv';
import portArg from '../middlewares/args'

dotenv.config();

const venvs = {
  MONGO_ATLAS_URL: process.env.MONGO_ATLAS_SRV || 'mongoSRV',
  PORT: portArg || process.env.PORT || 8080,
  MONGO_LOCAL_DBNAME: process.env.MONGO_LOCAL_DBNAME || 'LOCALDB',
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || 'faceId',
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || 'faceSecret',
  ETHEREAL_EMAIL: process.env.ETHEREAL_EMAIL || 'email@ethereal.email',
  ETHEREAL_PASSWORD: process.env.ETHEREAL_PASSWORD || 'password',
  ETHEREAL_NAME: process.env.ETHEREAL_NAME || 'ethereal owner name',
  GMAIL_EMAIL: process.env.GMAIL_EMAIL || 'email@gmail.com',
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD || 'password',
  GMAIL_NAME: process.env.GMAIL_NAME || 'GMAIL owner name',
  TWILIO_ACCOUNT_ID: process.env.TWILIO_ACCOUNT_ID || 'twilioId',
  TWILIO_TOKEN: process.env.TWILIO_TOKEN || 'twilioToken',
  TWILIO_CELLPHONE: process.env.TWILIO_CELLPHONE || '+123456789',
};

export default venvs;