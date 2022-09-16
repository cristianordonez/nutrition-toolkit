import axios from 'axios';
import { Query } from '../../types/types';

const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/';
const X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY;
const X_RAPIDAPI_HOST = process.env.X_RAPIDAPI_HOST;

const getSpoonacularGroceryProducts = async (groceryProductsQuery: Query) => {
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

const getSpoonacularProductById = async (id: number) => {
   const currentUrl = `${url}food/products/${id}`;
   let productInfo = await axios.get(currentUrl, {
      headers: {
         'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
         'X-RapidAPI-Host': `${X_RAPIDAPI_HOST}`,
      },
   });
   return productInfo.data; //must return only the .data object otherwise will get JSON type error
};

export { getSpoonacularGroceryProducts, getSpoonacularProductById };
