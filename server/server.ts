require('dotenv').config();
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import auth from './routes/auth.route';
import recipes from './routes/recipe.route';
import menuItems from './routes/menuitems.route';
import groceryProducts from './routes/groceryproducts.route';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { pool } from './database/db';
import bcrypt from 'bcrypt';

const port = 8080;
const app = express();

//MIDDLEWARE
app.use(compression());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(
   session({
      secret: `${process.env.SESSION_SECRET}`,
      saveUninitialized: true,
      resave: true,
   })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
   new LocalStrategy((username, password, cb) => {
      console.log('username:', username);
      console.log('password:', password);
      pool.query(
         'SELECT id, username, hash, email FROM users WHERE username=$1',
         [username],
         (err, result) => {
            console.log('result:', result);
            if (err) {
               console.log('err:', err);
               return cb(err);
            }
            if (result.rows.length > 0) {
               const first = result.rows[0];
               bcrypt.compare(password, first.password, function (err, res) {
                  if (res) {
                     cb(null, {
                        id: first.id,
                        username: first.username,
                        type: first.type,
                     });
                  } else {
                     cb(null, false);
                  }
               });
            } else {
               console.log('here in else passport ');
               cb(null, false);
            }
         }
      );
   })
);

passport.serializeUser((user: any, done) => {
   done(null, user.id);
});

passport.deserializeUser((id: string, cb) => {
   pool.query(
      'SELECT id, username, FROM users WHERE id = $1',
      [parseInt(id, 10)],
      (err, results) => {
         console.log('results in deserialize user:', results);
         if (err) {
            console.log('err:', err);
            return cb(err);
         }

         cb(null, results.rows[0]);
      }
   );
});

//ROUTES
app.use('/', auth);
app.use('/recipes', recipes);
app.use('/menuItems', menuItems);
app.use('/groceryProducts', groceryProducts);

// app.post(
//    '/login',
//    passport.authenticate('local', { failureRedirect: '/login' }),
//    function (req, res) {
//       res.redirect('/');
//    }
// );

// app.get('/', (req: express.Request, res: express.Response) => {
//    res.status(200).json({
//       status: 'success',
//       data: {
//          name: 'Diabetes Meal Plan',
//          version: '1.0.0',
//       },
//    });
// });

//START SERVER
app.listen(port, () => {
   console.log(`App listening on port ${port}`);
});
