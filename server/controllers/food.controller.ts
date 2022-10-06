import { Request, Response } from 'express';
import { Query } from '../../types/types';
import {
   get,
   getAdvanced,
   getAdvancedByBrand,
   getByBrand,
   getSampleItems,
} from '../models/food.model';

const getFoodItemsSimple = async (req: Request, res: Response) => {
   try {
      const query = req.query as unknown as Query;
      const foodItemsSimple = await get(query);
      res.status(200).send(foodItemsSimple);
   } catch (err) {
      console.log(err);
      res.status(400).send('Unable to retrieve search results.');
   }
};

const getFoodItemsSimpleByBrand = async (req: Request, res: Response) => {
   try {
      const query = req.query as unknown as Query;
      const foodItemsSimple = await getByBrand(query);
      res.status(200).send(foodItemsSimple);
   } catch (err) {
      console.log(err);
      res.status(400).send('Unable to retrieve search results.');
   }
};

const getFoodItemsAdvanced = async (req: Request, res: Response) => {
   try {
      const query = req.query as unknown as Query;
      const foodItems = await getAdvanced(query);
      res.status(200).send(foodItems);
   } catch (err) {
      console.log(err);
      res.status(400).send('Unable to retrieve search results.');
   }
};

const getFoodItemsAdvancedByBrand = async (req: Request, res: Response) => {
   try {
      const query = req.query as unknown as Query;
      const foodItems = await getAdvancedByBrand(query);
      res.status(200).send(foodItems);
   } catch (err) {
      console.log(err);
      res.status(400).send('Unable to retrieve search results.');
   }
};

const getSampleFoodItems = async (req: Request, res: Response) => {
   try {
      const foodItems = await getSampleItems();
      console.log('foodItems: ', foodItems);
      res.status(200).send(foodItems);
   } catch (err) {
      console.log('err: ', err);
      res.status(400).send('Unable to retrieve search results.');
   }
};
export {
   getFoodItemsAdvanced,
   getFoodItemsSimpleByBrand,
   getFoodItemsSimple,
   getFoodItemsAdvancedByBrand,
   getSampleFoodItems,
};
