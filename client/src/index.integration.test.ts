/**
 * @jest-environment node
 */

process.env.NODE_ENV = 'test'; //set NODE_ENV to 'test' so that test database is used
import supertest from 'supertest';
import { expect } from '../../jestGlobals';
import app from '../../server/app';
import { pool } from '../../server/database/db';
const request = supertest(app);

let userQuery = `CREATE TABLE users (
	username varchar(50) NOT NULL,
	email varchar(45) NOT NULL,
	spoonacular_username varchar(45) NOT NULL,
	spoonacular_password varchar(45) NOT NULL,
	spoonacular_hash varchar(45) NOT NULL,
	hash varchar(100) NOT NULL,
	id serial4 NOT NULL,
	intolerances _text NULL,
	CONSTRAINT users_pk PRIMARY KEY (id)
);`;

let goalsQuery = `CREATE TABLE daily_goals (
	total_carbohydrates int4 NULL,
	min_carbs_per_meal int4 NULL,
	max_carbs_per_meal int4 NULL,
	total_protein int4 NULL,
	min_protein_per_meal int4 NULL,
	max_protein_per_meal int4 NULL,
	total_fat int4 NULL,
	min_fat_per_meal int4 NULL,
	max_fat_per_meal int4 NULL,
	total_calories int4 NULL,
	min_calories_per_meal int4 NULL,
	max_calories_per_meal int4 NULL,
	user_id int4 NOT NULL,
	id serial4 NOT NULL,
	CONSTRAINT daily_goals_pk PRIMARY KEY (id),
	CONSTRAINT daily_goals_unique UNIQUE (user_id)
);`;

let cookie: any; //create cookie variable to be set so that sessions are not reset
let testCookie: any; //used for the account in the before and after hooks

beforeAll(async () => {
   await pool.query(userQuery);
   await pool.query(goalsQuery);
   let beforeResponse = await request.post('/api/signup').send({
      username: 'test',
      email: 'test@email.com',
      password: 'password',
   });
   testCookie = beforeResponse.headers['set-cookie'];
});

afterAll(async () => {
   await pool.query('DROP TABLE users');
   await pool.query('DROP TABLE daily_goals');
   await request.post('/api/logout').set('Cookie', testCookie);
   // pool.end();
   await pool.end();
});

console.log('request:', request);

describe('Authentication routes', () => {
   test('POST /login: should allow user to login if they have account', async () => {
      let currentResponse = await request.get('/api');
      expect(currentResponse.statusCode).toBe(200);
   });
   test('POST /login: should allow user to login if they have account', async () => {
      let currentResponse = await request.post('/api/login').send({
         username: 'test',
         password: 'password',
      });
      expect(currentResponse.statusCode).toBe(200);
   });
   test('POST /signup: it should allow user to create an account and then set session', async () => {
      let response = await request.post('/api/signup').send({
         username: 'test user',
         email: 'testemail@email.com',
         password: 'password',
      });
      expect(response.statusCode).toBe(201);
      cookie = response.headers['set-cookie']; //update cookie here so session is saved
   });
   test('POST /metrics: it should allow user to add metrics', async () => {
      let body = {
         total_carbohydrates: 200,
         min_carbs_per_meal: 45,
         max_carbs_per_meal: 65,
         total_protein: 200,
         min_protein_per_meal: 45,
         max_protein_per_meal: 65,
         total_fat: 200,
         min_fat_per_meal: 45,
         max_fat_per_meal: 75,
         total_calories: 2000,
         min_calories_per_meal: 400,
         max_calories_per_meal: 700,
      };
      let metricsResponse = await request
         .post('/api/metrics')
         .set('Cookie', cookie) //need to set cookie from previous response to sessions are not reset
         .send(body);

      expect(metricsResponse.statusCode).toBe(201);
   });

   test('POST /login: should allow user to login', async () => {
      let loginResponse = await request.post('/api/login').send({
         username: 'test user',
         password: 'password',
      });
      expect(loginResponse.statusCode).toBe(200);
      expect(loginResponse.body).toEqual({ id: 2, username: 'test user' });
   });

   test('GET /metrics: should allow user to retrieve metrics from database', async () => {
      let metricsResponse = await request
         .get('/api/metrics')
         .set('Cookie', cookie);
      expect(metricsResponse.statusCode).toBe(200);
      expect(metricsResponse.body.min_carbs_per_meal).toBe(45);
   });
   test('POST /logout: should allow user to logout', async () => {
      let logoutResponse = await request
         .post('/api/logout')
         .set('Cookie', cookie);
      expect(logoutResponse.statusCode).toBe(200);
      expect(logoutResponse.text).toBe('You have been logged out');
   });
});

//describe block testing the spoonacular endpoints
