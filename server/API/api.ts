import axios from 'axios';
import {
   QueryType,
   UserType,
   AccountType,
   MealPlanType,
} from './api.types';

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
   console.log(spoonacularUser);
   return spoonacularUser;
};

export const getSpoonacularRecipes = async (
   recipeQuery: QueryType
): Promise<object> => {
   let intoleranceQuery = recipeQuery.intolerance.length
      ? recipeQuery.intolerance
      : false;

   let recipes = await axios.get(`${url}recipes/complexSearch`, {
      params: {
         query: `${recipeQuery.query}`,
         intolerances: `${intoleranceQuery}`,
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
   console.log('menuItems:', menuItems);
   return menuItems.data.menuItems;
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

//adds a specific item to mealplan of user 
export const addToSpoonacularMealplan = async (
   data: MealPlanType,
   username: string,
   hash: string
) => {
   console.log('hash in api get meal plan day:', hash)
   const response = await axios.post(
      `${url}mealplanner/${username}/items`,
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

type SelectedDay = {
   date: string;
}
//gets item for specific day
export const getFromSpoonacularMealplanDay = async (username: string, selectedDay: SelectedDay, hash: string) => {
   console.log('hash: ', hash)
   const response = await axios.post(`${url}mealplanner/${username}/day/${selectedDay.date}?hash=${hash}`,
   {
      headers: {

         'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
         'X-RapidAPI-Host': `${X_RAPIDAPI_HOST}`,
      },
   });
   return response;
};
export const getFromSpoonacularMealplanWeek = async () => {};
export const deleteFromSpoonacularMealplan = async () => {};
