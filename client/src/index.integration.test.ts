/**
 * @jest-environment node
 */

process.env.NODE_ENV = 'test'; //set NODE_ENV to 'test' so that test database is used
let cookie; //create cookie variable to be set so that sessions are not reset
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

beforeAll(async () => {
   await pool.query(userQuery);
   await pool.query(goalsQuery);
});

// beforeEach(async () => {
//    // seed with some data
//    // await db.query("INSERT INTO students (name) VALUES ('Elie'), ('Matt')");
//     await request.post('/api/signup').send({
//       username: 'test user',
//       email: 'testemail@email.com',
//       password: 'password',
//    });
// });

// afterEach(async () => {
//    await pool.query('DELETE FROM students');
// });

afterAll(async () => {
   await pool.query('DROP TABLE users');
   await pool.query('DROP TABLE daily_goals');
   pool.end();
});

describe('Sending GET request to /api', () => {
   test('it should return a 200 status code', async () => {
      let response = await request.get('/api');
      expect(response.statusCode).toBe(200);
   });
});

describe('Authentication routes', () => {
   test('POST /signup: it should allow user to create an account', async () => {
      let response = await request.post('/api/signup').send({
         username: 'test user',
         email: 'testemail@email.com',
         password: 'password',
      });
      expect(response.statusCode).toBe(201);
      cookie = response.headers['set-cookie'];
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
         .set('Cookie', cookie)
         .send(body);
      console.log('metricsResponse:', metricsResponse);
      expect(metricsResponse.statusCode).toBe(201);
   });
   // test('POST /metrics: it should allow user to add metrics', async () => {
   //    let body = {
   //       total_carbohydrates: 200,
   //       min_carbs_per_meal: 45,
   //       max_carbs_per_meal: 65,
   //       total_protein: 200,
   //       min_protein_per_meal: 45,
   //       max_protein_per_meal: 65,
   //       total_fat: 200,
   //       min_fat_per_meal: 45,
   //       max_fat_per_meal: 75,
   //       total_calories: 2000,
   //       min_calories_per_meal: 400,
   //       max_calories_per_meal: 700,
   //    };
   //    let response = await request.post('/api/metrics').send(body);
   //    console.log('response:', response);
   // });
});
