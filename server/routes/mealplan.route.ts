import { Request, Response, Router } from 'express';
import {
   addMealPlanItem,
   deleteMealPlanItem,
   getMealPlanDay,
   getMealPlanWeek,
   getRandomMealplanDay,
} from '../controllers/mealplan.controller';

const router = Router();

//handles adding item to mealplan
router.post('/', (req: Request, res: Response) => {
   addMealPlanItem(req, res);
});

//handles getting the mealplan day
router.get('/day', (req: Request, res: Response) => {
   getMealPlanDay(req, res);
});

//handles getting the mealplan week
router.get('/week', (req: Request, res: Response) => {
   getMealPlanWeek(req, res);
});

//grabs random meaplan day from api
router.get('/sample', (req: Request, res: Response) => {
   getRandomMealplanDay(req, res);
});

//handles deleting item from user mealplan
router.delete('/delete/:id', (req: Request, res: Response) => {
   deleteMealPlanItem(req, res);
});

export { router };
