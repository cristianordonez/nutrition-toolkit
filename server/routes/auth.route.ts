import {
   NextFunction,
   Request,
   RequestHandler,
   Response,
   Router,
} from 'express';
import passport from 'passport';
import { Session } from '../../types/types';
import {
   checkAuthentication,
   createAccount,
   forgotPassword,
   resetPassword,
} from '../controllers/auth.controller';
const router = Router();

router.post('/forgotPassword', (req: Request, res: Response) => {
   forgotPassword(req, res) as unknown as RequestHandler;
});

router.post('/resetPassword', (req: Request, res: Response) => {
   resetPassword(req, res) as unknown as RequestHandler;
});

router.get('/login/federated/google', passport.authenticate('google'));

//gets code from google, then exchaanges code for profile info
router.get(
   '/oauth2/redirect/google',
   passport.authenticate('google', {
      failureRedirect: `/login`,
      failureMessage: true,
   }), //fires second part of passport strategy
   (req: Request, res: Response) => {
      const session = req.session as unknown as Session;
      session.user_id = session.passport.user;
      //redirect user to the search page where session will be checked
      res.redirect(`/home`);
   }
);

router.get('/authentication', (req: Request, res: Response) => {
   checkAuthentication(req, res) as unknown as RequestHandler;
});

router.post('/signup', (req: Request, res: Response) => {
   createAccount(req, res) as unknown as RequestHandler;
});

//#req.user will be just a string of the user_id for both google and email login

router.post(
   '/login',
   passport.authenticate('local', {
      failureRedirect: `/login`,
      failureMessage: true,
   }),
   (req: Request, res: Response) => {
      const user = req.user as string;
      const session = req.session as unknown as Session;
      session.user_id = user;
      res.status(201).send('Successfully logged in.');
   }
);

router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
   req.logout(function (err: unknown) {
      if (err) {
         return next(err);
      }
      const session = req.session as unknown as Session;
      session.destroy();
      res.status(200).send('You have been logged out');
   });
});

//endpoint that gets redirect to when there is error logging in, used so that client can be sent error message from server
router.get('/error', (req: Request, res: Response) => {
   res.status(500).send('Incorrect username or password.');
});

export { router };
