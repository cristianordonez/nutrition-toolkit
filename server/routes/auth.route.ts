import { Request, Response, Router } from 'express';
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

//handles creating account
router.post('/signup', (req: Request, res: Response) => {
   controller.create(req, res);
});

router.post(
   '/login',
   passport.authenticate('local', { failureRedirect: '/login' }),
   (req: Request, res: Response) => {
      res.redirect('/');
   }
);

export default router;
