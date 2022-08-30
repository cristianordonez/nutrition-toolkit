//#connects server to the models
import { Request, Response } from 'express';
import * as apiHelpers from '../API/api';
import { getHashByUsername } from '../models/user.model';

type User = {
   id: number;
   username: string;
   email: string;
   spoonacular_username: string;
};

export const addMealPlanItem = async function (req: Request, res: Response) {
   const user = req.user as User;
   let hash = await getHashByUsername(user.spoonacular_username);
   try {
      const response = await apiHelpers.addToSpoonacularMealplan(
         req.body,
         user.spoonacular_username,
         hash[0].spoonacular_hash
      );
      res.status(201).send(response.data.status);
   } catch (err) {
      console.log(err);
      res.status(400).send('Error adding item to mealplan');
   }
};

type selectedDay = {
   date: string;
};

type Hash = [{ spoonacular_hash: string }];

//gets all meals for certain day using date in form of string
export const getMealPlanDay = async function (req: Request, res: Response) {
   const mealplanDay = req.query as selectedDay;
   const user = req.user as User;
   try {
      let hash = await getHashByUsername(user.spoonacular_username); //returns Hash type
      let mealplanDayItems = await apiHelpers.getFromSpoonacularMealplanDay(
         user.spoonacular_username,
         mealplanDay.date,
         hash[0].spoonacular_hash
      );
      res.status(200).send(mealplanDayItems.data);
   } catch (err: any) {
      if (err.response.data.message === 'No meals planned for that day') {
         res.status(400).send(err.response.data.message);
      } else {
         res.status(400).send('Bad Request.');
      }
   }
};

type selectedWeek = {
   date: string;
};

//gets all meal plans for a selected week
export const getMealPlanWeek = async function (req: Request, res: Response) {
   const mealplanWeek = req.query as selectedWeek;
   const user = req.user as User;
   try {
      let hash = await getHashByUsername(user.spoonacular_username); //returns Hash type
      let mealplanWeekItems = await apiHelpers.getFromSpoonacularMealplanWeek(
         user.spoonacular_username,
         mealplanWeek.date,
         hash[0].spoonacular_hash
      );

      res.status(200).send('Successfully deleted mealplan item.');
   } catch (err) {
      console.log(err);
      res.status(400).send('No meal plan items found.');
   }
};

export const deleteMealPlanItem = async function (req: Request, res: Response) {
   const id = req.params.id;
   const user = req.user as User;
   try {
      let hash = await getHashByUsername(user.spoonacular_username); //returns Hash type
      let successResponse = await apiHelpers.deleteFromSpoonacularMealplan(
         user.spoonacular_username,
         id,
         hash[0].spoonacular_hash
      );
      res.status(200).send('Item has been deleted.');
   } catch (err) {
      res.status(400).send('Unable to delete item.');
      console.log(err);
   }
};

export const generateMealplanDay = async function (
   req: Request,
   res: Response
) {
   try {
      let mealplanItems = await apiHelpers.generateMealplanDay();
      console.log('mealplanItems:', mealplanItems);
      res.status(200).send(mealplanItems);
   } catch (err) {
      res.status(400).send('Unable to delete item.');
      console.log(err);
   }
};
