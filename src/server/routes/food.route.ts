import { Request, RequestHandler, Response, Router } from 'express';
import {
   getFoodItemsAdvanced,
   getFoodItemsAdvancedByBrand,
   getFoodItemsSimple,
   getSampleFoodItems,
} from '../controllers/food.controller';

const router = Router();

router.get('/', (req: Request, res: Response) => {
   getFoodItemsAdvanced(req, res) as unknown as RequestHandler;
});

router.get('/all', (req: Request, res: Response) => {
   getFoodItemsSimple(req, res) as unknown as RequestHandler;
});

router.get('/brand', (req: Request, res: Response) => {
   getFoodItemsAdvancedByBrand(req, res) as unknown as RequestHandler;
});

router.get('/sample', (req: Request, res: Response) => {
   getSampleFoodItems(req, res) as unknown as RequestHandler;
});

export { router };
