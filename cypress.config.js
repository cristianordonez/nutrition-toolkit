const { defineConfig } = require('cypress');
process.env.NODE_ENV = 'test';
import { db } from './server/database/db';
import { schemas } from './server/database/SQL'; //import the sql queries

// tasks are called with cy.task(taskName)
module.exports = defineConfig({
   e2e: {
      baseUrl: 'http://localhost:3000/',
      setupNodeEvents(on, config) {
         // implement node event listeners here
         on('task', {
            'db:seed': async () => {
               console.log('schemas:', schemas.users);
               await db.query(schemas.users);
               let response = await db.query(schemas.daily_goals);
               return response;
            },
            'db:teardown': async () => {
               const response = db.query(`
               DROP TABLE daily_goals;
               DROP TABLE users;
               `);
               return response;
            },
         });
      },
   },
});
