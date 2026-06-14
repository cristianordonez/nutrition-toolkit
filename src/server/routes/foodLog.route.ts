import { Request, RequestHandler, Response, Router } from 'express';
import {
   addFoodLogItem,
   createCustomItem,
   deleteItem,
   getFoodLogDay,
   getSampleFoodLogDay,
} from '../controllers/foodLog.controller';

const router = Router();

router.post('/', (req: Request, res: Response) => {
   addFoodLogItem(req, res) as unknown as RequestHandler;
});

router.get('/day', (req: Request, res: Response) => {
   getFoodLogDay(req, res) as unknown as RequestHandler;
});

router.delete('/:id', (req: Request, res: Response) => {
   deleteItem(req, res) as unknown as RequestHandler;
});

router.post('/custom', (req: Request, res: Response) => {
   createCustomItem(req, res) as unknown as RequestHandler;
});

router.get('/sample', (req: Request, res: Response) => {
   getSampleFoodLogDay(req, res) as unknown as RequestHandler;
});

export { router };
