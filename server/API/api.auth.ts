import axios from 'axios';
import { AccountType, UserType } from '../../types/types';

const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/';
const X_RAPIDAPI_KEY = process.env.X_RAPIDAPI_KEY;
const X_RAPIDAPI_HOST = process.env.X_RAPIDAPI_HOST;

const connectUser = async (user: UserType) => {
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

export { connectUser };
