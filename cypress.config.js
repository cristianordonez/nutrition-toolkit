//! Cypress tests use the real database, not test database;
const { defineConfig } = require('cypress');
import { buildQueries } from '@testing-library/react';
import { db } from './server/database/db';
import { schemas } from './server/database/SQL'; //import the sql queries

// tasks are called with cy.task(taskName)
module.exports = defineConfig({
   projectId: 'kure77',
   video: false,
   e2e: {
      baseUrl: 'http://localhost:3000/',
      setupNodeEvents(on, config) {
         // implement node event listeners here
         //  config.env.NODE_ENV = process.env.NODE_ENV;

         on('task', {
            'db:teardown': async () => {
               await db.query(
                  `DELETE FROM daily_goals WHERE user_id IN (SELECT id FROM users WHERE username='TEST_USER')`
               );

               const response = db.query(`
               DELETE FROM users WHERE username = 'TEST_USER';
               `);
               return response;
            },
         });
      },
   },
});
