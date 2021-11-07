import dotenv from 'dotenv';
import portArg from '../middlewares/args'

dotenv.config();

const venvs = {
  MONGO_ATLAS_URL: process.env.MONGO_ATLAS_SRV || 'mongoSRV',
  PORT: portArg || process.env.PORT || 8080,
  MONGO_LOCAL_DBNAME: process.env.MONGO_LOCAL_DBNAME || 'LOCALDB',
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || 'faceId',
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || 'faceSecret',
};

export default venvs;