/**
 * @jest-environment node
 */
process.env.NODE_ENV = 'test';
import supertest from 'supertest';
import { expect } from '../jestGlobals';
import app from './app';
import { db } from './database/db';
const { schemas } = require('./database/SQL'); //import the sql queries
const request = supertest(app);

beforeAll(async () => {
   await db.query(schemas.food);
   await db.query(schemas.food_nutrition);
   await db.query(schemas.branded_food);
   await db.query(schemas.custom_food);
});

afterAll(async () => {
   await db.query(`DROP TABLE custom_food`);
   await db.query(`DROP TABLE branded_food`);
   await db.query('DROP TABLE food_nutrition');
   await db.query('DROP TABLE food');
});

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
