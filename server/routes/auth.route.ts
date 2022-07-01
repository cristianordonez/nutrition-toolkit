import { NextFunction, Request, Response, Router } from 'express';
import * as controller from '../controllers/user.controller';
import passport from 'passport';
const router = Router();

router.get('/', (req: Request, res: Response) => {
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
   controller.checkAuthentication(req, res);
});

//# handles creating account
router.post('/signup', (req: Request, res: Response) => {
   controller.createAccount(req, res);
});

//# handles updating the users metrics at signup
router.post('/metrics', (req: Request, res: Response) => {
   controller.createMetrics(req, res);
});

router.get('/metrics', (req: Request, res: Response) => {
   controller.getMetrics(req, res);
});

//# handles logging the user in
router.post(
   '/login',
   passport.authenticate('local', {
      failureRedirect: `/error`,
      failureMessage: true,
   }),
   (req: Request, res: Response) => {
      res.status(200).send(req.user);
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
   res.status(500).send('Incorrect username or password.');
});

export { router };
