import { Request, Response, Router } from 'express';
import {
   getFoodItemsAdvanced,
   getFoodItemsAdvancedByBrand,
   getFoodItemsSimple,
   getFoodItemsSimpleByBrand,
   getSampleFoodItems,
} from '../controllers/food.controller';

const router = Router();

router.get('/', (req: Request, res: Response) => {
   getFoodItemsAdvanced(req, res);
});

router.get('/all', (req: Request, res: Response) => {
   getFoodItemsSimple(req, res);
});

router.get('/all/brand', (req: Request, res: Response) => {
   getFoodItemsSimpleByBrand(req, res);
});

router.get('/brand', (req: Request, res: Response) => {
   getFoodItemsAdvancedByBrand(req, res);
});

router.get('/sample', (req: Request, res: Response) => {
   getSampleFoodItems(req, res);
});

export { router };
