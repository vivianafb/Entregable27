import minimist from 'minimist';
import dotenv from 'dotenv';
dotenv.config();
const args = minimist(process.argv.slice(2));

// if (args)
//   console.log(
//     'Argumentos validos: port=NUMBER  clientId=FACEBOOK_CLIENT_ID  clientSecret=FACEBOOK_CLIENT_SECRET'
//   );

export const Argumentos = args;
export const portArg = args.puerto || 8080;
export const clientIdArg = args.clientId;
export const clientSecretArgt = args.clientSecret;