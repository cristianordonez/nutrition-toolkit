import { Request, Response } from 'express';
import {
   AddToMealPlanType,
   CustomFoodInput,
   PassportGoogleUser,
   SelectedDate,
} from '../../types/types';
import { createFood, createFoodNutrition } from '../models/food.model';
import {
   createMeal,
   createMealNutrition,
   deleteFood,
   getByDay,
   getNutritionSummaryByDay,
   getSampleFoods,
   getSampleFoodsNutritionSummary,
} from '../models/mealplan.model';

const getSampleMealplanDay = async (req: Request, res: Response) => {
   try {
      const sampleItems = await getSampleFoods();
      const nutritionSummary = await getSampleFoodsNutritionSummary();
      res.status(200).send({ sampleItems, nutritionSummary });
   } catch (err) {
      console.log('err getting sample meals: ', err);
      res.status(400).send('Unable to get sample meal plan');
   }
};

//# adds item to users meals, then updates the user_meal_nutrition table
//# for this item in seperate query
const addMealPlanItem = async function (req: Request, res: Response) {
   try {
      const body = req.body as AddToMealPlanType;
      const user = req.user as PassportGoogleUser;
      const mealId = await createMeal(body, user.user_id);
      await createMealNutrition(mealId[0].meal_id);
      res.status(201).send('Successfully posted mealplan item');
   } catch (err) {
      console.log('error adding mealplan item', err);
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
      console.log('error deleting mealplan item: ', err);
      res.status(400).send('Unable to delete item.');
   }
};

//# adds new food to database, then adds it to users meals,
//# then returns the updated meal items for user
//# if adding foods with unit size other than grams or mL, convert to grams first and then divide by 100 to get conversion factor
const createCustomItem = async (req: Request, res: Response) => {
   try {
      const body = req.body as CustomFoodInput;
      const user = req.user as PassportGoogleUser;
      const serving_size_conversion_factor = Number(body.serving_size) / 100; //used to convert to amount per serving size used from amount per 100 g
      const standardized_conversion_factor = 100 / Number(body.serving_size); //used to convert the input amount to amount per 100 g
      console.log(
         'standardized conversion factor: ',
         standardized_conversion_factor
      );
      const fdc_id = await createFood(
         body.description,
         serving_size_conversion_factor,
         body.brand_owner,
         body.serving_size,
         body.serving_size_unit,
         user.user_id
      );
      await createFoodNutrition(
         body.nutrition,
         fdc_id[0].fdc_id,
         standardized_conversion_factor
      );
      // const title = getFoodTitle(body.brand_name, body.description);
      const mealItem = {
         date: body.date,
         slot: body.slot,
         data_type: body.data_type,
         fdc_id: fdc_id[0].fdc_id,
         servings: body.servings,
         serving_size: body.serving_size,
         serving_size_unit: body.serving_size_unit,
         description: body.description,
         brand_owner: body.brand_owner,
      };
      const mealId = await createMeal(mealItem, user.user_id);
      const dbResponse = await createMealNutrition(mealId[0].meal_id);
      const updatedMealItems = await getByDay(body.date, user.user_id);
      const updatedNutritionSummary = await getNutritionSummaryByDay(
         body.date,
         user.user_id
      );
      res.status(200).send({ updatedMealItems, updatedNutritionSummary });
   } catch (err) {
      console.log('err: ', err);
      res.status(400).send('Unable to createMeal new food');
   }
};

export {
   addMealPlanItem,
   getMealPlanDay,
   deleteMealPlanItem,
   createCustomItem,
   getSampleMealplanDay,
};
