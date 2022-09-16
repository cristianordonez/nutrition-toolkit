import axios from 'axios';
import { Query, RecipeQuery } from '../../types/types';

const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/';
const X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY;
const X_RAPIDAPI_HOST = process.env.X_RAPIDAPI_HOST;

const getSpoonacularRecipes = async (recipeQuery: Query): Promise<object> => {
   let recipes = await axios.get(`${url}recipes/complexSearch`, {
      params: {
         query: `${recipeQuery.query}`,
         type: `${recipeQuery.type}`,
         instructionsRequired: 'true',
         addRecipeInformation: 'true',
         sort: 'calories',
         sortDirection: 'asc',
         minCarbs: `${recipeQuery.minCarbs}`,
         maxCarbs: `${recipeQuery.maxCarbs}`,
         minProtein: `${recipeQuery.minProtein}`,
         maxProtein: ` ${recipeQuery.maxProtein}`,
         minCalories: `${recipeQuery.minCalories}`,
         maxCalories: `${recipeQuery.maxCalories}`,
         minFat: `${recipeQuery.minFat}`,
         maxFat: `${recipeQuery.maxFat}`,
         offset: `${recipeQuery.offset}`,
         number: `${recipeQuery.number}`,
      },
      headers: {
         'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
         'X-RapidAPI-Host': `${X_RAPIDAPI_HOST}`,
      },
   });
   return recipes.data.results;
};

const getSpoonacularRandomRecipes = async () => {
   let currentUrl = `${url}recipes/random?number=50`;
   let randomRecipes = await axios.get(currentUrl, {
      headers: {
         'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
         'X-RapidAPI-Host': `${X_RAPIDAPI_HOST}`,
      },
   });
   return randomRecipes.data;
};

const getSpoonacularRecipesByQuery = async (query: RecipeQuery) => {
   let currentUrl = `${url}recipes/complexSearch?query=${query.query}&offset=${query.offset}&number=${query.number}`;
   let matchingRecipes = await axios.get(currentUrl, {
      headers: {
         'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
         'X-RapidAPI-Host': `${X_RAPIDAPI_HOST}`,
      },
   });
   return matchingRecipes.data.results;
};

const getSpoonacularRecipeById = async (id: number) => {
   const currentUrl = `${url}recipes/${id}/information?includeNutrition=true`;
   let recipeInfo = await axios.get(currentUrl, {
      headers: {
         'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
         'X-RapidAPI-Host': `${X_RAPIDAPI_HOST}`,
      },
   });
   return recipeInfo.data; //must return only the .data object otherwise will get JSON type error
};

export {
   getSpoonacularRecipes,
   getSpoonacularRandomRecipes,
   getSpoonacularRecipesByQuery,
   getSpoonacularRecipeById,
};
