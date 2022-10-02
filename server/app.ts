require('dotenv').config();
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express, { Request, Response } from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import path from 'path';
import { PassportGoogleUser } from '../types/types';
import { db } from './database/db';
import { createGoogleUser, getGoogleUser } from './models/auth.model';
import { router as authRoute } from './routes/auth.route';
import { router as foodRoute } from './routes/food.route';
import { router as goalsRoute } from './routes/goals.route';
import { router as mealplanRoute } from './routes/mealplan.route';

const GoogleStrategy = require('passport-google-oidc');
const pgSession = require('connect-pg-simple')(session);
const app = express();

app.use(cors());
app.use(compression());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//TODO change database back after testing
const database =
   process.env.NODE_ENV === 'test' ? 'mealplans_test' : 'mealplans_test';

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
      secret: `${process.env.SESSION_SECRET}`,
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

passport.use(
   new LocalStrategy((usernameOrEmail, password, cb) => {
      db.query(
         `SELECT hash, users.id FROM user_hash 
         INNER JOIN users
         ON user_id=users.id
         WHERE username='${usernameOrEmail}' 
         OR email = '${usernameOrEmail}'`
      )
         .then(function (result: any) {
            if (result.length) {
               const first = result[0];
               bcrypt.compare(password, first.hash, function (err, res) {
                  if (res) {
                     cb(null, {
                        id: first.id,
                        username: first.username,
                     });
                  } else {
                     cb(null, false, { message: 'Incorrect password' });
                  }
               });
            } else {
               cb(null, false, {
                  message: 'No account with that username exists',
               });
            }
         })
         .catch(function (err: any) {
            console.log(err);
            return cb(err);
         });
   })
);

passport.use(
   new GoogleStrategy(
      {
         clientID: process.env['GOOGLE_SIGNIN_CLIENT_ID'],
         clientSecret: process.env['GOOGLE_SIGNIN_CLIENT_SECRET'],
         callbackURL: '/api/oauth2/redirect/google',
         scope: ['profile', 'email'], //the data we are asking for from google
      },
      (issuer: any, profile: any, done: any) => {
         getGoogleUser(profile.emails[0].value)
            .then((response: PassportGoogleUser[]) => {
               //if user exists, redirect
               if (response.length > 0) {
                  done(null, response[0]);
               } else {
                  let user = {} as PassportGoogleUser;
                  user.username = profile.displayName;
                  user.email = profile.emails[0].value;
                  createGoogleUser(user).then((userId: number) => {
                     user.id = userId;

                     done(null, user);
                  });
               }
            })
            .catch((err: any) => {
               console.log('error authenticating with Google: ', err);
               done(err);
            });
      }
   )
);

//determines which data of user object should be stored in session to be accessed below in the deserializeUser function
passport.serializeUser((user: any, done) => {
   done(null, user.id);
});

passport.deserializeUser((id: string, cb) => {
   db.query(`SELECT id, username, email FROM users WHERE id='${id}'`)
      .then(function (results: any) {
         cb(null, results[0]);
      })
      .catch(function (err: any) {
         return cb(err);
      });
});

//ROUTES
app.get('/', (req: Request, res: Response) => {
   res.status(200).json({
      status: 'success',
      data: {
         name: 'Diabetes Calculator API',
         version: '1.0.0',
      },
   });
});

app.use('/api', authRoute);
app.use('/api/goals', goalsRoute);
app.use('/api/mealplan', mealplanRoute);
app.use('/api/food', foodRoute);

app.get('/*', (req, res) => {
   res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

export default app; //export to be used for tests and in server.js
