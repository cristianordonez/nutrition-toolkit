import { NextFunction, Request, Response, Router } from 'express';
import { createAccount, createMetrics } from '../controllers/user.controller';
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

//handles creating account
router.post('/signup', (req: Request, res: Response) => {
   createAccount(req, res);
});

router.post('/metrics', (req: Request, res: Response) => {
   createMetrics(req, res);
});

router.post(
   '/login',
   passport.authenticate('local', {
      failureRedirect: `/api/error`,
      failureMessage: true,
   }),
   (req: Request, res: Response) => {
      console.log('req:', req.user);
      res.status(201).send(req.user);
   }
);

router.post('/logout', (req: any, res: Response, next: NextFunction) => {
   req.logout(function (err: any) {
      if (err) {
         return next(err);
      }
      req.session.destroy();
      res.json('You have been logged out.');
   });
});
//endpoint that gets redirect to when there is error logging in,
// used so that client can be sent error message from server
router.get('/error', (req: Request, res: Response) => {
   console.log('req.session in /error:', req.session);
   console.log('req.user in /error:', req.user);
   let session: any = req.session;
   res.status(500).send('Incorrect username or password.');
});

export { router };
