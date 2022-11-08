//! Cypress tests use the real database, not test database;
const { defineConfig } = require('cypress');
import { db } from './server/database/db';

// tasks are called with cy.task(taskName)
module.exports = defineConfig({
   projectId: 'kure77',
   video: false,
   e2e: {
      baseUrl: 'http://localhost:8080/',
      setupNodeEvents(on, config) {
         require('@cypress/code-coverage/task')(on, config);
         on('task', {
            'db:teardown': async () => {
               await db.query(
                  `DELETE FROM user_daily_goals WHERE user_id IN (SELECT user_id FROM users WHERE email='currenttestemail@email.com')`
               );
               await db.query(
                  `DELETE FROM user_hash WHERE user_id IN (SELECT user_id FROM users WHERE email='currenttestemail@email.com')`
               );

               const response = db.query(`
                  DELETE FROM users WHERE email = 'currenttestemail@email.com';
                  `);
               return response;
            },
         });
         return config;
      },
   },
});
