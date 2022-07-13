import { NextFunction, Request, Response, Router, Express } from 'express';
import * as userController from '../controllers/user.controller';
import passport from 'passport';
const router = Router();

router.get('/', (req: Request, res: Response) => {
   console.log('req.session:', req.session);
   res.status(200).json({
      status: 'success',
      data: {
         name: 'Diabetes Meal Plan',
         version: '1.0.0',
      },
   });
});

//# handles checking if user is logged in for protected routes
router.get('/authentication', (req: Request, res: Response) => {
   userController.checkAuthentication(req, res);
});

//# handles creating account
router.post('/signup', (req: Request, res: Response) => {
   userController.createAccount(req, res);
});

//# handles updating the users metrics at signup
router.post('/metrics', (req: Request, res: Response) => {
   userController.createMetrics(req, res);
});

router.get('/metrics', (req: Request, res: Response) => {
   userController.getMetrics(req, res);
});


declare module 'express-session' {
   interface SessionData {
     user_id: number;
   }
 }

//# handles logging the user in
router.post(
   '/login',
   passport.authenticate('local', {
      failureRedirect: `/error`,
      failureMessage: true,
   }),
   (req: Request, res: Response) => {
      console.log('2. req.user:', req.user);
   
      let user: any = req.user;
  
      // req.session = req.session as any;
      req.session.user_id = user.id;
      req.session.save();
      console.log('3. req.session: ', req.session)
      res.status(200).send('Successfully logged in.');
   }
);

//# handles logging the user out
router.post('/logout', (req: any, res: Response, next: NextFunction) => {
   req.logout(function (err: any) {
      if (err) {
         return next(err);
      }
      req.session.destroy();
      res.status(200).send('You have been logged out');
   });
});

//#endpoint that gets redirect to when there is error logging in,
//# used so that client can be sent error message from server
router.get('/error', (req: Request, res: Response) => {
   let session: any = req.session;
   console.log('session in error route:', session);
   res.status(500).send('Incorrect username or password.');
});

export { router };
