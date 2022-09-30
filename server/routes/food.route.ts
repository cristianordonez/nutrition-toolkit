import { Request, Response, Router } from 'express';
import { getFoodItems } from '../controllers/food.controller';

const router = Router();

router.get('/', (req: Request, res: Response) => {
   getFoodItems(req, res);
});

router.get('/all', (req: Request, res: Response) => {});

export { router };
