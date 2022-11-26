/**
 * @jest-environment node
 */
process.env.DATABASE_NAME = 'the_macro_trainer_test';
import { expect } from '../shared/jestGlobals';
import supertest from 'supertest';
import app from './app';
import { db } from './database/db';
const { schemas } = require('./database/SQL');
const request = supertest(app);

const dropTables = async () => {
   await db.query(`DROP TABLE IF EXISTS custom_food`);
   await db.query(`DROP TABLE IF EXISTS branded_food`);
   await db.query('DROP TABLE IF EXISTS food_nutrition');
   await db.query('DROP TABLE IF EXISTS food');
   await db.query(`DROP TABLE IF EXISTS session`);
   await db.query(`DROP TABLE IF EXISTS user_daily_goals`);
   await db.query('DROP TABLE IF EXISTS user_hash');
   await db.query('DROP TABLE IF EXISTS user_meal_nutrition');
   await db.query('DROP TABLE IF EXISTS user_meal');
   await db.query('DROP TABLE IF EXISTS user_metrics');
   await db.query('DROP TABLE IF EXISTS sample_user_meal_nutrition');
   await db.query('DROP TABLE IF EXISTS sample_user_meal');
   await db.query('DROP TABLE IF EXISTS users');
};

beforeAll(async () => {
   await dropTables();
   await db.query(schemas.food);
   await db.query(schemas.food_nutrition);
   await db.query(schemas.branded_food);
   await db.query(schemas.custom_food);
   await db.query(schemas.session);
   await db.query(schemas.users);
   await db.query(schemas.user_daily_goals);
   await db.query(schemas.user_hash);
   await db.query(schemas.user_meal);
   await db.query(schemas.user_meal_nutrition);
   await db.query(schemas.user_metrics);
   await db.query(schemas.sample_user_meal);
   await db.query(schemas.sample_user_meal_nutrition);
});

afterAll(async () => {
   await dropTables();
});

describe('Authentication routes', () => {
   test('POST /signup: it should allow user to create an account and then set session', async () => {
      const response = await request.post('/api/signup').send({
         email: 'testemail@email.com',
         password: 'password',
      });
      expect(response.statusCode).toBe(201);
   });
   test('POST /metrics: it should allow user to add metrics', async () => {
      const body = {
         total_carbohydrates: 200,
         total_protein: 200,
         total_fat: 200,
         total_calories: 2000,
      };
      const response = await request.post('/api/signup').send({
         email: 'testemail1@email.com',
         password: 'password',
      });
      const cookie = response.headers['set-cookie']; //update cookie here so session is saved
      const metricsResponse = await request
         .post('/api/goals')
         .set('Cookie', cookie) //need to set cookie from previous response so sessions are not reset
         .send(body);
      expect(metricsResponse.statusCode).toBe(201);
   });
   test('POST /login: should allow user to login', async () => {
      const response = await request.post('/api/signup').send({
         email: 'testemail2@email.com',
         password: 'password',
      });
      const cookie = response.headers['set-cookie'];
      const loginResponse = await request
         .post('/api/login')
         .set('Cookie', cookie)
         .send({
            username: 'testemail2@email.com',
            password: 'password',
         });
      expect(loginResponse.statusCode).toBe(201);
   });
   test('GET /metrics: should allow user to retrieve metrics from database', async () => {
      const response = await request.post('/api/signup').send({
         email: 'testemail3@email.com',
         password: 'password',
      });
      const cookie = response.headers['set-cookie'];
      const metricsResponse = await request
         .get('/api/goals')
         .set('Cookie', cookie);
      expect(metricsResponse.statusCode).toBe(201);
   });
   test('POST /logout: should allow user to logout', async () => {
      const response = await request.post('/api/signup').send({
         email: 'testemail4@email.com',
         password: 'password',
      });
      const cookie = response.headers['set-cookie'];
      const logoutResponse = await request
         .post('/api/logout')
         .set('Cookie', cookie);
      expect(logoutResponse.statusCode).toBe(200);
      expect(logoutResponse.text).toBe('You have been logged out');
   });
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
