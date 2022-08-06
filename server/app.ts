require('dotenv').config();
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import session from 'express-session';
import cors from 'cors';
import passport from 'passport';
import { connectUser } from './API/api';
import { createGoogleUser, getById } from './models/user.model';
import { router as authRoute } from './routes/auth.route';
import { router as recipesRoute } from './routes/recipe.route';
import { router as menuItemsRoute } from './routes/menuitems.route';
import { router as groceryProductsRoute } from './routes/groceryproducts.route';
import { router as mealplanRoute } from './routes/mealplan.route';
import { Strategy as LocalStrategy } from 'passport-local';
const GoogleStrategy = require('passport-google-oidc');
const generator = require('generate-password');
import { db } from './database/db';
// import pgSession from 'connect-pg-simple';

import bcrypt from 'bcrypt';
const pgSession = require('connect-pg-simple')(session);
const app = express();

//MIDDLEWARE
app.use(cors());

app.use(compression());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const database =
   process.env.NODE_ENV === 'test' ? 'mealplans_test' : 'mealplans';

const conObject = {
   user: process.env.USER,
   password: process.env.PASSWORD,
   host: process.env.HOST, // or whatever it may be
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
   new LocalStrategy((username, password, cb) => {
      db.query(
         `SELECT id, username, hash, email FROM users WHERE username='${username}'`
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
            }
         })
         .catch(function (err: any) {
            console.log('err in passport use local strategy:', err);
            return cb(err);
         });
   })
);

// export type UserType = {
//    username: string;
//    email: string;
//    password: string;
// };

passport.use(
   new GoogleStrategy(
      {
         clientID: process.env['GOOGLE_CLIENT_ID'],
         clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
         callbackURL: '/api/oauth2/redirect/google',
         scope: ['profile', 'email'], //the data we are asking for from google
      },
      (issuer: any, profile: any, done: any) => {
         //todo search for user

         getById(profile.id)
            .then((response) => {
               //if user exists, redirect
               if (response.length > 0) {
                  //other wise create account
                  done(null, profile);
               } else {
                  let password = generator.generate({
                     length: 8,
                     numbers: true,
                  });
                  let spoonacularAccountPromise = connectUser({
                     username: profile.displayName,
                     email: profile.emails[0].value,
                     password: password,
                  }).then((spoonacularAccount) => {
                     let currentHash: Promise<string | void> = bcrypt //get hashed password to insert into database
                        .hash(password, 10)
                        .then((hash) => {
                           let user = {} as any;
                           user.spoonacular_username =
                              spoonacularAccount.data.username;
                           user.spoonacular_password =
                              spoonacularAccount.data.spoonacularPassword;
                           user.spoonacular_hash = spoonacularAccount.data.hash;
                           user.hash = hash;
                           user.username = profile.displayName;
                           user.email = profile.emails[0].value;
                           user.id = profile.id;
                           createGoogleUser(user).then((userId) => {
                              done(null, profile);
                           }); // then, send data to model to store all info in db
                           // let session: any = req.session; // put user id into req.sessions
                           // dbResponse.then((userInfo) => {

                           // });
                           // session.user_id = dbResponse[0].id; //save user_id to session so that it can be retrieved with next request when getting metrics
                           // res.status(201).send('You have successfully created an account!');
                        });
                  });
               }
            })
            .catch((err) => {
               console.log('err in catch get by id: ', err);
               done(err);
            });

         //let user = req.body;
         //delete user.password;
         //let dbResponse = await userModel.create(user); // then, send data to model to store all info in db
         //let session: any = req.session; // put user id into req.sessions
         //session.user_id = dbResponse[0].id; //save user_id to session so that it can be retrieved with next request when getting metrics
         //res.status(201).send('You have successfully created an account!');
      }
      // function verify(issuer: any, profile: any, cb: any) {
      //    db.get(
      //       'SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?',
      //       [issuer, profile.id],
      //       function (err: any, row: any) {
      //          if (err) {
      //             console.log('err in first db.get call: ', err);
      //             return cb(err);
      //          }
      //          if (!row) {
      //             console.log('profile: ', profile);
      //             console.log('profile.displayName: ', profile.displayName);
      //             console.log('issuer: ', issuer);
      //             db.run(
      //                'INSERT INTO users (name) VALUES (?)',
      //                [profile.displayName],
      //                function (err: any) {
      //                   if (err) {
      //                      console.log('err in second db.run call: ', err);
      //                      return cb(err);
      //                   }
      //                   // let that: any = this as any;
      //                   var id = this.lastID;
      //                   db.run(
      //                      'INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)',
      //                      [id, issuer, profile.id],
      //                      function (err: any) {
      //                         if (err) {
      //                            console.log('err in third db.run: ', err);
      //                            return cb(err);
      //                         }
      //                         var user = {
      //                            id: id,
      //                            name: profile.displayName,
      //                         };
      //                         console.log('user: ', user);
      //                         return cb(null, user);
      //                      }
      //                   );
      //                }
      //             );
      //          } else {
      //             db.get(
      //                'SELECT * FROM users WHERE id = ?',
      //                [row.user_id],
      //                function (err: any, row: any) {
      //                   if (err) {
      //                      console.log('err in fourth db.get: ', err);
      //                      return cb(err);
      //                   }
      //                   if (!row) {
      //                      return cb(null, false);
      //                   }
      //                   console.log('row in last query call: ', row);
      //                   return cb(null, row);
      //                }
      //             );
      //          }
      //       }
      //    );
      // }
   )
);

//determines which data of user object should be stored in session to be accessed
// below in the deserializeUser function
passport.serializeUser((user: any, done) => {
   done(null, user.id);
});

passport.deserializeUser((id: string, cb) => {
   console.log('here in deserializeUser');
   console.log('id: ', id);
   console.log('typeof id: ', typeof id);
   db.query(
      `SELECT id, username, email, spoonacular_username FROM users WHERE id='${id}'`
   )
      .then(function (results: any) {
         console.log('results in deserialize user: ', results);
         cb(null, results[0]);
      })
      .catch(function (err: any) {
         console.log('err in deserialize user:', err);
         return cb(err);
      });
});

//ROUTES
app.use('/api/recipes', recipesRoute);
app.use('/api/menuItems', menuItemsRoute);
app.use('/api/groceryProducts', groceryProductsRoute);
app.use('/api/mealplan', mealplanRoute);
app.use('/api', authRoute);
app.get('/*', (req, res) => {
   res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
export default app; //export to be used for tests and in server.js
