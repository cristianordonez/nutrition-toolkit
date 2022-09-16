import axios from 'axios';
import { Query } from '../../types/types';

const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/';
const X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY;
const X_RAPIDAPI_HOST = process.env.X_RAPIDAPI_HOST;

const getSpoonacularMenuItems = async (menuQuery: Query) => {
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

const getSpoonacularMenuItemById = async (id: number) => {
   const currentUrl = `${url}food/menuItems/${id}`;
   let menuItemInfo = await axios.get(currentUrl, {
      headers: {
         'X-RapidAPI-Key': `${X_RAPIDAPI_KEY}`,
         'X-RapidAPI-Host': `${X_RAPIDAPI_HOST}`,
      },
   });
   return menuItemInfo.data; //must return only the .data object otherwise will get JSON type error
};

export { getSpoonacularMenuItems, getSpoonacularMenuItemById };
