import { Request, Response, Router } from 'express';
import * as userController from '../controllers/user.controller';
const router = Router();

//# handles updating the users metrics at signup
router.post('/', (req: Request, res: Response) => {
   userController.createMetrics(req, res);
});

router.get('/', (req: Request, res: Response) => {
   userController.getMetrics(req, res);
});

router.put('/', (req: Request, res: Response) => {
   userController.updateMetrics(req, res);
});

export { router };
