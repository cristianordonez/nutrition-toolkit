import { Request, Response, Router } from 'express';
import {
   addFoodLogItem,
   createCustomItem,
   deleteItem,
   getFoodLogDay,
   getSampleFoodLogDay,
} from '../controllers/foodLog.controller';

const router = Router();

router.post('/', (req: Request, res: Response) => {
   addFoodLogItem(req, res);
});

router.get('/day', (req: Request, res: Response) => {
   getFoodLogDay(req, res);
});

router.delete('/:id', (req: Request, res: Response) => {
   deleteItem(req, res);
});

router.post('/custom', (req: Request, res: Response) => {
   createCustomItem(req, res);
});

router.get('/sample', (req: Request, res: Response) => {
   getSampleFoodLogDay(req, res);
});

export { router };
