import axios from 'axios';
import {
   AccountType,
   addToMealPlanType,
   QueryType,
   UserType,
} from '../../types/types';

const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/';
const X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY;
const X_RAPIDAPI_HOST = process.env.X_RAPIDAPI_HOST;

export const connectUser = async (user: UserType) => {
   const spoonacularUser = await axios.post<AccountType>(
      `${url}users/connect`,
      user,
      {
         headers: {
            'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
            'X-RapidAPI-Host': `${X_RAPIDAPI_HOST}`,
         },
      }
   );
   return spoonacularUser;
};

export const getSpoonacularRecipes = async (
   recipeQuery: QueryType
): Promise<object> => {
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

export const getSpoonacularRandomRecipes = async () => {
   let currentUrl = `${url}recipes/random?number=50`;
   let randomRecipes = await axios.get(currentUrl, {
      headers: {
         'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
         'X-RapidAPI-Host': `${X_RAPIDAPI_HOST}`,
      },
   });
   return randomRecipes.data;
};

type RecipeQuery = {
   offset: string;
   number: string;
   query: string;
};

export const getSpoonacularRecipesByQuery = async (query: RecipeQuery) => {
   let currentUrl = `${url}recipes/complexSearch?query=${query.query}&offset=${query.offset}&number=${query.number}`;
   let matchingRecipes = await axios.get(currentUrl, {
      headers: {
         'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
         'X-RapidAPI-Host': `${X_RAPIDAPI_HOST}`,
      },
   });
   return matchingRecipes.data.results;
};

export const generateMealplanDay = async () => {
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

export const getSpoonacularRecipeById = async (id: number) => {
   const currentUrl = `${url}recipes/${id}/information?includeNutrition=true`;
   let recipeInfo = await axios.get(currentUrl, {
      headers: {
         'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
         'X-RapidAPI-Host': `${X_RAPIDAPI_HOST}`,
      },
   });
   return recipeInfo.data; //must return only the .data object otherwise will get JSON type error
};

export const getSpoonacularMenuItems = async (menuQuery: QueryType) => {
   //does not use intolerance or diet since API does not accept those values for this request
   const menuItems = await axios.get(`${url}food/menuItems/search`, {
      params: {
         query: `${menuQuery.query}`,
         type: `${menuQuery.type}`,
         addMenuItemInformation: 'true',
         sort: 'calories',
         sortDirection: 'asc',
         minCarbs: `${menuQuery.minCarbs}`,
         maxCarbs: `${menuQuery.maxCarbs}`,
         minProtein: `${menuQuery.minProtein}`,
         maxProtein: ` ${menuQuery.maxProtein}`,
         minCalories: `${menuQuery.minCalories}`,
         maxCalories: `${menuQuery.maxCalories}`,
         minFat: `${menuQuery.minFat}`,
         maxFat: `${menuQuery.maxFat}`,
         offset: `${menuQuery.offset}`,
         number: `${menuQuery.number}`,
      },
      headers: {
         'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
         'X-RapidAPI-Host': `${X_RAPIDAPI_HOST}`,
      },
   });
   return menuItems.data.menuItems;
};

export const getSpoonacularMenuItemById = async (id: number) => {
   const currentUrl = `${url}food/menuItems/${id}`;
   let menuItemInfo = await axios.get(currentUrl, {
      headers: {
         'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
         'X-RapidAPI-Host': `${X_RAPIDAPI_HOST}`,
      },
   });
   return menuItemInfo.data; //must return only the .data object otherwise will get JSON type error
};

export const getSpoonacularGroceryProducts = async (
   groceryProductsQuery: QueryType
) => {
   //does not use type, intolerance or diet since API does not accept those values for this request
   const groceryProducts = await axios.get(`${url}food/products/search`, {
      params: {
         query: `${groceryProductsQuery.query}`,
         type: `${groceryProductsQuery.type}`,
         addProductInformation: 'true',
         sort: 'calories',
         sortDirection: 'asc',
         maxCarbs: `${groceryProductsQuery.maxCarbs}`,
         minCarbs: `${groceryProductsQuery.minCarbs}`,
         minProtein: `${groceryProductsQuery.minProtein}`,
         maxProtein: ` ${groceryProductsQuery.maxProtein}`,
         minCalories: `${groceryProductsQuery.minCalories}`,
         maxCalories: `${groceryProductsQuery.maxCalories}`,
         minFat: `${groceryProductsQuery.minFat}`,
         maxFat: `${groceryProductsQuery.maxFat}`,
         offset: `${groceryProductsQuery.offset}`,
         number: `${groceryProductsQuery.number}`,
      },
      headers: {
         'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
         'X-RapidAPI-Host': `${X_RAPIDAPI_HOST}`,
      },
   });
   return groceryProducts.data.products;
};

export const getSpoonacularProductById = async (id: number) => {
   const currentUrl = `${url}food/products/${id}`;
   let productInfo = await axios.get(currentUrl, {
      headers: {
         'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
         'X-RapidAPI-Host': `${X_RAPIDAPI_HOST}`,
      },
   });
   return productInfo.data; //must return only the .data object otherwise will get JSON type error
};

//adds a specific item to mealplan of user
export const addToSpoonacularMealplan = async (
   data: addToMealPlanType,
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
   return response;
};

//gets item for specific day
export const getFromSpoonacularMealplanDay = async (
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
   let response = await axios.request(options);
   return response;
};

export const getFromSpoonacularMealplanWeek = async (
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

export const deleteFromSpoonacularMealplan = async (
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
