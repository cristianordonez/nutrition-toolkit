import { Request, Response, Router } from 'express';
import {
   addMealPlanItem,
   createCustomItem,
   deleteMealPlanItem,
   getMealPlanDay,
   getSampleMealplanDay,
} from '../controllers/mealplan.controller';

const router = Router();

router.post('/', (req: Request, res: Response) => {
   addMealPlanItem(req, res);
});

router.get('/day', (req: Request, res: Response) => {
   getMealPlanDay(req, res);
});

router.delete('/:id', (req: Request, res: Response) => {
   console.log('here in router delete');
   deleteMealPlanItem(req, res);
});

router.post('/custom', (req: Request, res: Response) => {
   createCustomItem(req, res);
});

router.get('/sample', (req: Request, res: Response) => {
   getSampleMealplanDay(req, res);
});

export { router };
