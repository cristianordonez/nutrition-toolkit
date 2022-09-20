import axios from 'axios';
import { Query } from '../../types/types';

const url =
   'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients';
const X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY;
const X_RAPIDAPI_HOST = process.env.X_RAPIDAPI_HOST;

const getSpoonacularIngredients = async (ingredientsQuery: Query) => {
   //does not use type, intolerance or diet since API does not accept those values for this request
   const ingredients = await axios.get(`${url}/search`, {
      params: {
         query: `${ingredientsQuery.query}`,
         addChildren: 'true',
         sort: 'calories',
         sortDirection: 'asc',
         metaInformation: true,
         minCarbsPercent: `${ingredientsQuery.minCarbs}`,
         maxCarbsPercent: `${ingredientsQuery.maxCarbs}`,
         minProteinPercent: `${ingredientsQuery.minProtein}`,
         maxProteinPercent: ` ${ingredientsQuery.maxProtein}`,
         minFatPercent: `${ingredientsQuery.minFat}`,
         maxFatPercent: `${ingredientsQuery.maxFat}`,
         offset: `${ingredientsQuery.offset}`,
         number: `${ingredientsQuery.number}`,
      },
      headers: {
         'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
         'X-RapidAPI-Host': `${X_RAPIDAPI_HOST}`,
      },
   });
   return ingredients.data.results;
};

const getSpoonacularIngredientById = async (
   id: number,
   amount?: string | undefined | number,
   unit?: string | undefined
) => {
   const currentUrl = `${url}/${id}/information`;
   console.log('currentUrl:', currentUrl);
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
