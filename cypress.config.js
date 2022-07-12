//! Cypress tests use the real database, not test database;
const { defineConfig } = require('cypress');
import { db } from './server/database/db';
import { schemas } from './server/database/SQL'; //import the sql queries

// tasks are called with cy.task(taskName)
module.exports = defineConfig({
   projectId: "kure77",
   e2e: {
      baseUrl: 'http://localhost:3000/',
      setupNodeEvents(on, config) {
         // implement node event listeners here
       //  config.env.NODE_ENV = process.env.NODE_ENV;
  
         on('task', {
            'db:teardown': async () => {
               await db.query('DELETE FROM session');
               const response = db.query(`
               DELETE FROM users WHERE username = 'TEST_USER';
               `);
               return response;
            },
         });
      },
   },
});
