import { Request, Response } from 'express';
import {
   AddToMealPlanType,
   PassportGoogleUser,
   SelectedDate,
} from '../../types/types';
import { createFood } from '../models/food.model';
import {
   create,
   createMealNutrition,
   deleteFood,
   getByDay,
   getNutritionSummaryByDay,
} from '../models/mealplan.model';

//# adds item to users meals, then updates the user_meal_nutrition table
//# for this item in seperate query
const addMealPlanItem = async function (req: Request, res: Response) {
   try {
      const body = req.body as AddToMealPlanType;
      const user = req.user as PassportGoogleUser;
      const mealId = await create(body, user.user_id);
      await createMealNutrition(mealId[0].id);
      res.status(201).send('Successfully posted mealplan item');
   } catch (err) {
      console.log(err);
      res.status(400).send('Error adding item to mealplan');
   }
};

//# gets all meals for user, then also gets object showing sum of
//# calories, carbs, protein, fat for all meal items
const getMealPlanDay = async function (req: Request, res: Response) {
   try {
      const query = req.query as SelectedDate;
      const user = req.user as PassportGoogleUser;
      const mealplanItems = await getByDay(query.date, user.user_id);
      const nutritionSummary = await getNutritionSummaryByDay(
         query.date,
         user.user_id
      );
      res.status(200).send({ mealplanItems, nutritionSummary });
   } catch (err) {
      console.log('err:', err);
      res.status(400).send('Unable to get mealplan items');
   }
};

//#deletes item from users meals, then gets updated meals and returns to user
const deleteMealPlanItem = async function (req: Request, res: Response) {
   try {
      const params = req.params as { id: string };
      const query = req.query as { currentDay: string };
      const user = req.user as PassportGoogleUser;
      await deleteFood(user.user_id, params.id);
      const updatedItems = await getByDay(query.currentDay, user.user_id);
      const updatedNutritionSummary = await getNutritionSummaryByDay(
         query.currentDay,
         user.user_id
      );
      res.status(200).send({ updatedItems, updatedNutritionSummary });
   } catch (err) {
      console.log(err);
      res.status(400).send('Unable to delete item.');
   }
};

//# adds new food to database, then adds it to users meals,
//# then returns the updated meal items for user
const createCustomItem = async (req: Request, res: Response) => {
   try {
      const body = req.body;
      console.log('body: ', body);
      const response = await createFood();
   } catch (err) {
      console.log('err: ', err);
      res.status(400).send('Unable to create new food');
   }
};

//1 create new table with following properties
// brand_name optional
// ingredients string
// serving size
// serving size unit
//fdc_id
//user_id

//TODO when asking for input from user to add custom item, ask for following items:
// all items from new table above
// description
// calories
// protein
// fat
// carbs
// all other nutrients optional

//TODO now add data to food table, then new table, and then food_nutrition table, then user meal, then user meal nutrition
// when adding to food return fdc_id to use for other tables
//when adding nutrients to food_nutrition table, make sure it is amount per 100 grams only
// add description, data_type of 'custom' to food and serving_size_conversion_factor
// to find serving_size_conversion factor convert to grams then divide serving_size by 100
//when adding title to mealplan item, combine brand_name and description

export {
   addMealPlanItem,
   getMealPlanDay,
   deleteMealPlanItem,
   createCustomItem,
};
