import bodyParser from 'body-parser';
import compression from 'compression';
import ConnectPg from 'connect-pg-simple';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import pinoHttp from 'pino-http';
import { customGoogleStrategy } from './auth/googleStrategy';
import { customLocalStrategy } from './auth/localStrategy';
import { db } from './database/db';
import { router as authRoute } from './routes/auth.route';
import { router as foodRoute } from './routes/food.route';
import { router as foodLogRoute } from './routes/foodLog.route';
import { router as goalsRoute } from './routes/goals.route';
import { router as metricsRoute } from './routes/metrics.route';
import { logger } from './logger';
dotenv.config();

const pgSession = ConnectPg(session);
const envVariables = process.env as unknown as { SESSION_SECRET: string };
const app = express();

app.use(pinoHttp({ logger }));
app.use(cors());
app.use(compression());
app.use(express.static(path.join(__dirname, '../../dist/client')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const conObject = {
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   host: process.env.DATABASE_HOST,
   port: 5432,
   database: process.env.DATABASE_NAME,
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
passport.use('google', customGoogleStrategy);
passport.use('local', customLocalStrategy);

/**
 * determines which data of user object should be stored in session to be accessed below in the deserializeUser function
 */
passport.serializeUser((user: unknown, done) => {
   if (typeof user === 'object' && user !== null && 'user_id' in user) {
      const userId = (user as { user_id: string }).user_id;
      logger.info(`Serializing user from object: ${JSON.stringify(user)}`);
      done(null, userId);
   } else if (Number.isFinite(parseFloat(user as string))) {
      logger.info(`Serializing user with ID: ${user}`);
      done(null, user);
   } else {
      logger.error('User object is not a valid type');
      done(new Error('User object is not a valid type'));
   }
});

type User = {
   user_id: string;
   email: string;
};

passport.deserializeUser((userId: string, cb) => {
   logger.info(`Deserializing user with ID: ${userId}`);
   db.any(`SELECT user_id, email FROM users WHERE user_id=$1`, [Number(userId)])
      .then(function (results: User[]) {
         logger.info(
            `User retrieved from database: ${JSON.stringify(results[0])}`
         );
         cb(null, results[0]);
      })
      .catch(function (err: unknown) {
         logger.error(`${err}`);
         return cb(err);
      });
});

app.use('/api', authRoute);
app.use('/api/goals', goalsRoute);
app.use('/api/foodLog', foodLogRoute);
app.use('/api/food', foodRoute);
app.use('/api/metrics', metricsRoute);

app.get('/api', (req: Request, res: Response) => {
   res.status(200).json({
      status: 'success',
      data: {
         name: 'NutritionToolkit API',
         version: process.env.npm_package_version,
      },
   });
});

app.get('/*', (req, res) => {
   res.sendFile(path.join(__dirname, '../../dist/client/index.html'));
});

export default app;
