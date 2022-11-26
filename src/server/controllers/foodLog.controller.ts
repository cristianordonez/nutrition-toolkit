import { Request, Response } from 'express';
import {
   AddToFoodLogType,
   CustomFoodInput,
   SelectedDate,
   Session,
} from '../../shared/types';
import { createFood } from '../models/food.model';
import {
   createFoodLogItem,
   deleteFoodLogItem,
   getByDay,
   getNutritionSummaryByDay,
   getSampleFoods,
   getSampleFoodsNutritionSummary,
} from '../models/foodLog.model';

/**
 * get sample food items for feature page
 * @param req express Request object
 * @param res express Response object
 */
const getSampleFoodLogDay = async (req: Request, res: Response) => {
   try {
      const sampleItems = await getSampleFoods();
      const nutritionSummary = await getSampleFoodsNutritionSummary();
      res.status(200).send({ sampleItems, nutritionSummary });
   } catch (err) {
      console.log('err getting sample meals: ', err);
      res.status(400).send('Unable to get sample food log');
   }
};

/**
 * Adds item to users meals, then updates the user_meal_nutrition table
 * for this item in seperate query
 * @param req express Request object
 * @param res express Response object
 */
const addFoodLogItem = async function (req: Request, res: Response) {
   try {
      const body = req.body as AddToFoodLogType;
      const session = req.session as unknown as Session;
      await createFoodLogItem(body, session.user_id);
      res.status(201).send('Successfully posted food log item');
   } catch (err) {
      console.error(err);
      res.status(400).send('Error adding item to foodlog');
   }
};

/**
 * Gets all meals for user, then also gets object showing sum of
 * calories, carbs, protein, fat for all meal items
 * @param req express Request object
 * @param res express Response object
 */
const getFoodLogDay = async function (req: Request, res: Response) {
   try {
      const query = req.query as SelectedDate;
      const session = req.session as unknown as Session;
      const foodLogItems = await getByDay(query.date, session.user_id);
      const nutritionSummary = await getNutritionSummaryByDay(
         query.date,
         session.user_id
      );
      res.status(200).send({ foodLogItems, nutritionSummary });
   } catch (err) {
      console.log('err:', err);
      res.status(400).send('Unable to get food log items');
   }
};

/**
 * deletes item from users meals, then gets updated meals and returns to user
 * @param req express Request object
 * @param res express Response object
 */
const deleteItem = async function (req: Request, res: Response) {
   try {
      const params = req.params as { id: string };
      const query = req.query as { currentDay: string };
      const session = req.session as unknown as Session;
      await deleteFoodLogItem(session.user_id, params.id);
      const updatedItems = await getByDay(query.currentDay, session.user_id);
      const updatedNutritionSummary = await getNutritionSummaryByDay(
         query.currentDay,
         session.user_id
      );
      res.status(200).send({ updatedItems, updatedNutritionSummary });
   } catch (err) {
      console.log('error', err);
      res.status(400).send('Unable to delete food log item.');
   }
};

/**
 * Adds new food to database, then adds it to users meals,
 * Then returns the updated meal items for user
 * If adding foods with unit size other than grams or mL, convert to grams first and then divide by 100 to get conversion factor
 * @param req express Request object
 * @param res express Response object
 */
const createCustomItem = async (req: Request, res: Response) => {
   try {
      const body = req.body as CustomFoodInput;
      const session = req.session as unknown as Session;
      const standardized_conversion_factor = 100 / Number(body.serving_size); //used to convert the input amount to amount per 100 g
      const response = await createFood(
         body.description,
         body.brand_owner,
         body.serving_size,
         body.serving_size_unit,
         session.user_id,
         body.nutrition,
         standardized_conversion_factor
      );
      const mealItem = {
         date: body.date,
         slot: body.slot,
         data_type: body.data_type,
         fdc_id: response.fdc_id,
         servings: body.servings,
         serving_size: body.serving_size,
         serving_size_unit: body.serving_size_unit,
         description: body.description,
         brand_owner: body.brand_owner,
      };
      await createFoodLogItem(mealItem, session.user_id);
      const updatedFoodLogItems = await getByDay(body.date, session.user_id);
      const updatedNutritionSummary = await getNutritionSummaryByDay(
         body.date,
         session.user_id
      );
      res.status(200).send({ updatedFoodLogItems, updatedNutritionSummary });
   } catch (err) {
      console.log('err: ', err);
      res.status(400).send('Unable to createFoodLogItem new food');
   }
};

export {
   addFoodLogItem,
   getFoodLogDay,
   deleteItem,
   createCustomItem,
   getSampleFoodLogDay,
};
