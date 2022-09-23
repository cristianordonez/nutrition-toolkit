import axios from 'axios';
import { ShoppingListBody } from '../../types/types';

const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/';
const X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY;
const X_RAPIDAPI_HOST = process.env.X_RAPIDAPI_HOST;

const generateSpoonacularShoppingList = async (
   username: string,
   hash: string,
   currentDate: string
) => {
   let lastDay = parseInt(currentDate.slice(-1)) + 1;
   let endDate = currentDate.slice(0, -1) + lastDay;
   //    let currentUrl = `${url}mealplanner/${username}/shopping-list/${currentDate}/${endDate}?hash=${hash}`;
   //    const spoonacularShoppingList = await axios.post(currentUrl, {
   //       headers: {
   //          'content-type': 'application/json',
   //          'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
   //          'X-RapidAPI-Host': `${X_RAPIDAPI_HOST}`,
   //       },
   //    });

   //    return spoonacularShoppingList;
   const options = {
      method: 'POST',
      url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/mealplanner/${username}/shopping-list/${currentDate}/${endDate}`,
      params: { hash: `${hash}` },
      headers: {
         'content-type': 'application/json',
         'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
         'X-RapidAPI-Host': `${X_RAPIDAPI_HOST}`,
      },
      data: '{"key1":"value","key2":"value"}',
   };
   const spoonacularShoppingList = await axios.request(options);
   console.log('spoonacularShoppingLIst:', spoonacularShoppingList);
};

export { generateSpoonacularShoppingList };
