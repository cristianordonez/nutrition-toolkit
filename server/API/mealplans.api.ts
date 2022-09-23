import axios from 'axios';
import { AddIngredientsToMealPlan, AddToMealPlanType } from '../../types/types';

const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/';
const X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY;
const X_RAPIDAPI_HOST = process.env.X_RAPIDAPI_HOST;

//adds a specific item to mealplan of user
const addToSpoonacularMealplan = async (
   data: AddToMealPlanType | AddIngredientsToMealPlan,
   spoonacularUsername: string,
   hash: string
) => {
   const response = await axios.post(
      `${url}mealplanner/${spoonacularUsername}/items`,
      data,
      {
         params: {
            hash: `${hash}`,
         },
         headers: {
            'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
            'X-RapidAPI-Host': `${X_RAPIDAPI_HOST}`,
         },
      }
   );
   console.log('response in add to spoonacular mealplan api:', response);
   return response;
};

//gets item for specific day
const getFromSpoonacularMealplanDay = async (
   spoonacularUsername: string,
   selectedDay: string,
   spoonacularHash: string
) => {
   let options = {
      method: 'GET',
      url: `${url}mealplanner/${spoonacularUsername}/day/${selectedDay}`,
      params: { hash: spoonacularHash },
      headers: {
         'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
         'X-RapidAPI-Host': `${X_RAPIDAPI_HOST}`,
      },
   };
   console.log('options in get from spoonacular mealplanday:', options);
   let response = await axios.request(options);
   console.log('response.data:', response.data);
   return response.data;
};

const getFromSpoonacularMealplanWeek = async (
   spoonacular_username: string,
   selectedWeek: string,
   spoonacular_hash: string
) => {
   let response = await axios.get(
      `${url}mealplanner/${spoonacular_username}/week/${selectedWeek}`,
      {
         params: { hash: spoonacular_hash },
         headers: {
            'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
            'X-RapidAPI-Host': `${X_RAPIDAPI_HOST}`,
         },
      }
   );
   return response;
};

const deleteFromSpoonacularMealplan = async (
   spoonacularUsername: string,
   id: string | number,
   spoonacularHash: string
) => {
   let currentUrl = `${url}mealplanner/${spoonacularUsername}/items/${id}?hash=${spoonacularHash}`;

   const response = await axios.delete(currentUrl, {
      headers: {
         'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
         'X-RapidAPI-Host': `${X_RAPIDAPI_HOST}`,
      },
   });
   return response;
};

const generateMealplanDay = async () => {
   const currentUrl = `${url}recipes/mealplans/generate`;
   const generatedItems = await axios.get(currentUrl, {
      params: { timeFrame: 'day', targetCalories: '1500' },
      headers: {
         'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
         'X-RapidAPI-Host': `${X_RAPIDAPI_HOST}`,
      },
   });
   return generatedItems.data;
};

export {
   addToSpoonacularMealplan,
   getFromSpoonacularMealplanDay,
   getFromSpoonacularMealplanWeek,
   deleteFromSpoonacularMealplan,
   generateMealplanDay,
};
