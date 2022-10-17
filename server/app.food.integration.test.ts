/**
 * @jest-environment node
 */

process.env.NODE_ENV = 'production'; //set NODE_ENV to 'production' so that actual database is used
import supertest from 'supertest';
import { expect } from '../jestGlobals';
import app from './app';
const request = supertest(app);

describe('Food database routes', () => {
   test('Should allow user to get food items from API using advanced search', async () => {
      const getFoodResponse = await request.get('/api/food').query({
         query: 'spinach',
         allergy: '',
         minCalories: '100',
         maxCalories: '600',
         minCarbs: '10',
         maxCarbs: '50',
         minProtein: '10',
         maxProtein: '100',
         minFat: '10',
         maxFat: '100',
         number: 10, //number of items to return
         offset: 0, //number of results to skip, useful for lazy loading
      });
      expect(getFoodResponse.statusCode).toBe(200);
   });

   test('Should allow user to get list of all foods', async () => {
      const foodItems = await request.get('/api/food/all').query({
         query: 'spaghetti',
         minCalories: '',
         maxCalories: '',
         minCarbs: '',
         maxCarbs: '',
         minProtein: '',
         maxProtein: '',
         minFat: '',
         maxFat: '',
         number: '10', //number of items to return
         offset: 0, //number of results to skip, useful for lazy loading
      });
      expect(foodItems.statusCode).toBe(200);
   });
});
