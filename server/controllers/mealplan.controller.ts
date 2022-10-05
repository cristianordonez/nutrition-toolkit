import { Request, Response } from 'express';
import {
   AddToMealPlanType,
   PassportGoogleUser,
   SelectedDate,
} from '../../types/types';
import {
   create,
   createMealNutrition,
   deleteFood,
   getByDay,
   getNutritionSummaryByDay,
} from '../models/mealplan.model';

const addMealPlanItem = async function (req: Request, res: Response) {
   try {
      const body = req.body as AddToMealPlanType;
      const user = req.user as PassportGoogleUser;
      const mealId = await create(body, user.id);
      await createMealNutrition(mealId[0].id);
      res.status(201).send('Successfully posted mealplan item');
   } catch (err) {
      console.log(err);
      res.status(400).send('Error adding item to mealplan');
   }
};

const getMealPlanDay = async function (req: Request, res: Response) {
   try {
      const query = req.query as SelectedDate;
      const user = req.user as PassportGoogleUser;
      const mealplanItems = await getByDay(query.date, user.id);
      const nutritionSummary = await getNutritionSummaryByDay(
         query.date,
         user.id
      );
      res.status(200).send({ mealplanItems, nutritionSummary });
   } catch (err) {
      console.log('err:', err);
      res.status(400).send('Unable to get mealplan items');
   }
};

const deleteMealPlanItem = async function (req: Request, res: Response) {
   try {
      const params = req.params as { id: string };
      const query = req.query as { currentDay: string };
      const user = req.user as PassportGoogleUser;
      await deleteFood(user.id, params.id);
      const updatedItems = await getByDay(query.currentDay, user.id);
      const updatedNutritionSummary = await getNutritionSummaryByDay(
         query.currentDay,
         user.id
      );
      console.log('remainingItems: ', updatedItems);
      res.status(200).send({ updatedItems, updatedNutritionSummary });
   } catch (err) {
      console.log(err);
      res.status(400).send('Unable to delete item.');
   }
};

export { addMealPlanItem, getMealPlanDay, deleteMealPlanItem };
