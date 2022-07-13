//#connects server to the models
import { Request, Response } from 'express';
import * as apiHelpers from '../API/api';
import { getHashByUsername } from '../models/user.model';

type User = {
   id: number;
   username: string;
   email: string;
   spoonacular_username: string;
}

export const addMealPlanItem = async function (req: Request, res: Response) {
   const user = req.user as User;
   console.log('user:', user);
   let hash = await getHashByUsername(user.spoonacular_username);
   try {
      const response = await apiHelpers.addToSpoonacularMealplan(
         req.body,
         user.spoonacular_username,
         hash[0].spoonacular_hash
      );
      res.status(201).send(response.data.status);
   } catch (err) {
      console.log('err:', err);
      res.status(400).send('Error adding item to mealplan');
   }
};


type selectedDay = {
   date: string;
}


type Hash = [{spoonacular_hash: string}];

//todo
export const getMealPlanDay = async function (req: Request, res: Response) {
   const mealplanDay = req.query as selectedDay;
   const user = req.user as User;
   console.log('user from req.user', user);
   let hash = await getHashByUsername(user.spoonacular_username); //returns Hash type
   try {
      let response = await apiHelpers.getFromSpoonacularMealplanDay(user.spoonacular_username, mealplanDay, hash[0].spoonacular_hash);
      console.log('response in get meal plan day', response)
   } catch (err) {
      console.log('err:', err);
   }
};

//todo
export const getMealPlanWeek = async function (req: Request, res: Response) {
   try {
   } catch (err) {
      console.log('err:', err);
   }
};


//todo
export const deleteMealPlanItem = async function (req: Request, res: Response) {
   try {
   } catch (err) {
      console.log('err:', err);
   }
};