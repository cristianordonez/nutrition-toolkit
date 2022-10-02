import { Request, Response } from 'express';
import { Query } from '../../types/types';
import { get, getAdvanced } from '../models/food.model';

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

const getFoodItems = async (req: Request, res: Response) => {
   try {
      const query = req.query as unknown as Query;
      const foodItems = await getAdvanced(query);
      res.status(200).send(foodItems);
   } catch (err) {
      console.log(err);
      res.status(400).send('Unable to retrieve search results.');
   }
};

export { getFoodItems, getFoodItemsSimple };
