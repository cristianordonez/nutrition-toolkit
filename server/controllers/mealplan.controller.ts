//#connects server to the models
import { Request, Response } from 'express';
import * as apiHelpers from '../API/api';

export const addMealPlanItem = async function (req: Request, res: Response) {
   try {
      // let response = await apiHelpers.addToSpoonacularMealplan(req.body);
      console.log('req.body:', req.body);
   } catch (err) {
      console.log('err:', err);
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
