//#connects server to the models
import { Request, Response } from 'express';
import * as apiHelpers from '../API/api';
import { getHashByUsername } from '../models/user.model';

export const addMealPlanItem = async function (req: Request, res: Response) {
   let user = req.user as any;
   let session = req.session as any;
   console.log('user:', user);
   let hash = await getHashByUsername(user.spoonacular_username);

   try {
      let response = await apiHelpers.addToSpoonacularMealplan(
         req.body,
         user.spoonacular_username,
         hash[0].spoonacular_hash
      );
      console.log('response:', response);
      res.status(201).send(response.data.status);
   } catch (err) {
      console.log('err:', err);
      res.status(400).send('Error adding item to mealplan');
   }
};

export const deleteMealPlanItem = async function (req: Request, res: Response) {
   try {
   } catch (err) {
      console.log('err:', err);
   }
};

export const getMealPlanDay = async function (req: Request, res: Response) {
   try {
   } catch (err) {
      console.log('err:', err);
   }
};

export const getMealPlanWeek = async function (req: Request, res: Response) {
   try {
   } catch (err) {
      console.log('err:', err);
   }
};
