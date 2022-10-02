import { Request, Response } from 'express';
import {
   AddToMealPlanType,
   PassportGoogleUser,
   SelectedDate,
} from '../../types/types';
import {
   create,
   createMealNutrition,
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
   // const id = req.params.id;
   // const user = req.user as User;
   // try {
   //    let hash = await getHash(user.spoonacular_username); //returns Hash type
   //    let successResponse = await deleteFromSpoonacularMealplan(
   //       user.spoonacular_username,
   //       id,
   //       hash[0].spoonacular_hash
   //    );
   //    res.status(200).send('Item has been deleted.');
   // } catch (err) {
   //    res.status(400).send('Unable to delete item.');
   //    console.log(err);
   // }
};

export { addMealPlanItem, getMealPlanDay, deleteMealPlanItem };
