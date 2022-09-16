import axios from 'axios';
import { IngredientsQuery } from '../../types/types';

const url =
   'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients';
const X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY;
const X_RAPIDAPI_HOST = process.env.X_RAPIDAPI_HOST;

const getSpoonacularIngredients = async (
   ingredientsQuery: IngredientsQuery
) => {
   //does not use type, intolerance or diet since API does not accept those values for this request
   const ingredients = await axios.get(`${url}/search`, {
      params: {
         query: `${ingredientsQuery.query}`,
         addChildren: 'true',
         sort: 'carbohhydrates',
         sortDirection: 'asc',
         maxCarbs: `${ingredientsQuery.maxCarbsPercent}`,
         minCarbs: `${ingredientsQuery.minCarbsPercent}`,
         minProtein: `${ingredientsQuery.minProteinPercent}`,
         maxProtein: ` ${ingredientsQuery.maxProteinPercent}`,
         minCalories: `${ingredientsQuery.minCarbsPercent}`,
         maxCalories: `${ingredientsQuery.maxCarbsPercent}`,
         minFat: `${ingredientsQuery.minFatPercent}`,
         maxFat: `${ingredientsQuery.maxFatPercent}`,
         offset: `${ingredientsQuery.offset}`,
         number: `${ingredientsQuery.number}`,
      },
      headers: {
         'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
         'X-RapidAPI-Host': `${X_RAPIDAPI_HOST}`,
      },
   });
   return ingredients.data.products;
};

const getSpoonacularIngredientById = async (
   id: number,
   amount: string,
   unit: string
) => {
   const currentUrl = `${url}/${id}/information`;
   let ingredientInfo = await axios.get(currentUrl, {
      params: {
         amount: `${amount}`,
         unit: `${unit}`,
      },
      headers: {
         'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
         'X-RapidAPI-Host': `${X_RAPIDAPI_HOST}`,
      },
   });
   return ingredientInfo.data; //must return only the .data object otherwise will get JSON type error
};

export { getSpoonacularIngredients, getSpoonacularIngredientById };
