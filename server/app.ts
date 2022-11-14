import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import compression from 'compression';
import ConnectPg from 'connect-pg-simple';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import path from 'path';
import { db } from './database/db';
import { router as authRoute } from './routes/auth.route';
import { router as foodRoute } from './routes/food.route';
import { router as foodLogRoute } from './routes/foodLog.route';
import { router as goalsRoute } from './routes/goals.route';
// import GoogleStrategy from 'passport-google-oidc';
import { customGoogleStrategy } from './auth/googleStrategy';
// const GoogleStrategy = require('passport-google-oidc');

const pgSession = ConnectPg(session);
dotenv.config();

const envVariables = process.env as unknown as { SESSION_SECRET: string };

const app = express();

app.use(cors());
app.use(compression());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const database =
   process.env.NODE_ENV === 'test' ? 'test_database' : 'the_macro_trainer';

const conObject = {
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   host: process.env.DATABASE_HOST,
   port: 5432,
   database: database,
};

const pgStoreConfig = {
   conObject: conObject,
};

app.use(
   session({
      store: new pgSession(pgStoreConfig),
      secret: `${envVariables.SESSION_SECRET}`,
      saveUninitialized: false,
      resave: false,
      cookie: {
         secure: false,
         httpOnly: false,
         maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
      },
   })
);

app.use(passport.initialize());
app.use(passport.session());

type HashResponse = {
   hash: string;
   user_id: string;
};

passport.use('google', customGoogleStrategy);

passport.use(
   new LocalStrategy((username, password, cb) => {
      //expects key in body called username, but will check email instead for authentication
      db.query(
         `SELECT hash, users.user_id FROM user_hash 
         INNER JOIN users
         ON user_hash.user_id=users.user_id
         WHERE email = $1`,
         username
      )
         .then(function (result: HashResponse[]) {
            if (result.length) {
               const first = result[0];
               bcrypt.compare(password, first.hash, function (err, res) {
                  if (res) {
                     //saves second value to req.user, which I use to save to req.session so that it aligns with Google signin
                     cb(null, first.user_id);
                  } else {
                     cb(null, false, { message: 'Incorrect password' });
                  }
               });
            } else {
               cb(null, false, {
                  message: 'No account with that email exists',
               });
            }
         })
         .catch(function (err: unknown) {
            console.log(err);
            return cb(err);
         });
   })
);
// passport.use(
//    new GoogleStrategy(
//       {
//          clientID: process.env['GOOGLE_SIGNIN_CLIENT_ID'],
//          clientSecret: process.env['GOOGLE_SIGNIN_CLIENT_SECRET'],
//          callbackURL: '/api/oauth2/redirect/google',
//          scope: ['profile', 'email'], //the data we are asking for from google
//       },
//       (
//          issuer: string,
//          profile: { displayName: string; emails: [{ value: string }] },
//          done: (
//             err?: string | null,
//             user?: Express.User,
//             info?: unknown
//          ) => void
//       ) => {
//          getGoogleUser(profile.emails[0].value)
//             .then((response: PassportGoogleUser | null) => {
//                //if user exists, redirect
//                if (response !== null && response.user_id) {
//                   done(null, response.user_id);
//                } else {
//                   const user = {} as PassportGoogleUser;
//                   user.username = profile.displayName;
//                   user.email = profile.emails[0].value;
//                   createGoogleUser(user)
//                      .then((userId: number) => {
//                         user.user_id = userId;
//                         done(null, user.user_id);
//                      })
//                      .catch((err) => {
//                         done(err);
//                      });
//                }
//             })
//             .catch((err) => {
//                done(err);
//             });
//       }
//    )
// );

//determines which data of user object should be stored in session to be accessed below in the deserializeUser function
passport.serializeUser((userId: unknown, done) => {
   done(null, userId);
});

passport.deserializeUser((userId: string, cb) => {
   db.any(`SELECT user_id, username, email FROM users WHERE user_id=$1`, [
      Number(userId),
   ])
      .then(function (results: string[]) {
         cb(null, results[0]);
      })
      .catch(function (err: unknown) {
         return cb(err);
      });
});

//ROUTES
app.get('/', (req: Request, res: Response) => {
   res.status(200).json({
      status: 'success',
      data: {
         name: 'MacroTrainer API',
         version: '1.2.0',
      },
   });
});

app.use('/api', authRoute);
app.use('/api/goals', goalsRoute);
app.use('/api/foodLog', foodLogRoute);
app.use('/api/food', foodRoute);

app.get('/*', (req, res) => {
   res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

export default app;
