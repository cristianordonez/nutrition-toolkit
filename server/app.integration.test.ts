/**
 * @jest-environment node
 */
//# Supertest cannot be used to find req.user when using passport, so avoid these tests
process.env.NODE_ENV = 'test'; //set NODE_ENV to 'test' so that test database is used
import supertest from 'supertest';
import { expect } from '../jestGlobals';
import app from './app';
import { db } from './database/db';
const { schemas } = require('./database/SQL'); //import the sql queries
const request = supertest(app);

let cookie: string[]; //create cookie variable to be set so that sessions are not reset
let testCookie: string[]; //used for the account in the before and after hooks

beforeAll(async () => {
   await db.query(schemas.session);
   await db.query(schemas.users);
   await db.query(schemas.user_daily_goals);
   await db.query(schemas.user_hash);
   await db.query(schemas.user_meal);
   await db.query(schemas.user_meal_nutrition);
   await db.query(schemas.sample_user_meal);
   await db.query(schemas.sample_user_meal_nutrition);
   const beforeResponse = await request.post('/api/signup').send({
      username: 'test',
      email: 'test@email.com',
      password: 'password',
   });
   testCookie = beforeResponse.headers['set-cookie'];
});

afterAll(async () => {
   await db.query(`DROP TABLE session`);
   await db.query(`DROP TABLE user_daily_goals`);
   await db.query('DROP TABLE user_hash');
   await db.query('DROP TABLE user_meal_nutrition');
   await db.query('DROP TABLE user_meal');
   await db.query('DROP TABLE sample_user_meal_nutrition');
   await db.query('DROP TABLE sample_user_meal');
   await db.query('DROP TABLE users');
   await request.post('/api/logout').set('Cookie', testCookie);
});

describe('Authentication routes', () => {
   test('GET /: should allow user to access base url with no errors', async () => {
      const currentResponse = await request.get('/api');
      expect(currentResponse.statusCode).toBe(200);
   });

   test('POST /signup: it should allow user to create an account and then set session', async () => {
      const response = await request.post('/api/signup').send({
         username: 'test_user',
         email: 'testemail@email.com',
         password: 'password',
      });
      expect(response.statusCode).toBe(201);
      cookie = response.headers['set-cookie']; //update cookie here so session is saved
   });
   test('POST /metrics: it should allow user to add metrics', async () => {
      const body = {
         total_carbohydrates: 200,
         total_protein: 200,
         total_fat: 200,
         total_calories: 2000,
      };
      const metricsResponse = await request
         .post('/api/goals')
         .set('Cookie', cookie) //need to set cookie from previous response so sessions are not reset
         .send(body);

      expect(metricsResponse.statusCode).toBe(201);
   });
   test('POST /login: should allow user to login', async () => {
      const loginResponse = await request
         .post('/api/login')
         .set('Cookie', testCookie)
         .send({
            username: 'testemail@email.com',
            password: 'password',
         });
      expect(loginResponse.statusCode).toBe(201);
   });
   test('GET /metrics: should allow user to retrieve metrics from database', async () => {
      const metricsResponse = await request
         .get('/api/goals')
         .set('Cookie', cookie);
      expect(metricsResponse.statusCode).toBe(201);
   });
   test('POST /logout: should allow user to logout', async () => {
      const logoutResponse = await request
         .post('/api/logout')
         .set('Cookie', cookie);
      expect(logoutResponse.statusCode).toBe(200);
      expect(logoutResponse.text).toBe('You have been logged out');
   });
});
