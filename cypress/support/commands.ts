// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import '@testing-library/cypress/add-commands';
import 'cypress-jest-adapter';
import format from 'date-fns/format';
import startOfToday from 'date-fns/startOfToday';
declare global {
   namespace Cypress {
      interface Chainable {
         login(): Chainable<Element>;
         logout(): Chainable<Element>;
         signup(): Chainable<Element>;
         addItemsToMealplan(): Chainable<Element>;
      }
   }
}

// custom command to create user
Cypress.Commands.add('signup', () => {
   cy.request({
      url: '/api/signup',
      method: 'POST',
      body: {
         username: 'thisisatestuser',
         email: 'currenttestemail@email.com',
         password: 'password',
      },
   });
   cy.request({
      url: '/api/goals',
      method: 'POST',
      body: {
         total_carbohydrates: 200,
         total_protein: 85,
         total_fat: 75,
         total_calories: 2000,
      },
   });
   cy.request({
      url: '/api/mealplan',
      method: 'POST',
      body: {
         date: format(startOfToday(), 'yyyy-MM-dd'),
         slot: 1,
         position: 0,
         fdc_id: 1936614,
         servings: 2,
         brand_owner: 'Paramount Foods, LLC',
         description: 'Wasabi Green Peas',
         data_type: 'branded_food',
         serving_size: '100',
         serving_size_unit: 'g',
      },
   });
   cy.request({
      url: '/api/mealplan',
      method: 'POST',
      body: {
         date: format(startOfToday(), 'yyyy-MM-dd'),
         slot: 1,
         position: 0,
         fdc_id: 1936614,
         servings: 2,
         brand_owner: 'Paramount Foods, LLC',
         description: 'Wasabi Green Peas',
         data_type: 'branded_food',
         serving_size: '100',
         serving_size_unit: 'g',
      },
   });

   cy.request({
      url: '/api/mealplan',
      method: 'POST',
      body: {
         date: format(startOfToday(), 'yyyy-MM-dd'),
         slot: 1,
         position: 0,
         fdc_id: 1936614,
         servings: 2,
         brand_owner: 'Paramount Foods, LLC',
         description: 'Wasabi Green Peas',
         data_type: 'branded_food',
         serving_size: '100',
         serving_size_unit: 'g',
      },
   });
});

//custom command to create account AND login user
Cypress.Commands.add('login', () => {
   let response = cy.request({
      url: '/api/login',
      method: 'POST',
      body: {
         username: 'thisisatestuser',
         password: 'password',
      },
   });
   cy.visit(`/home/search`);
});

// custom command to logout user
Cypress.Commands.add('logout', () => {
   cy.request({
      url: '/api/logout',
      method: 'POST',
   });
   cy.visit(`/`);
});

//sends request to add items to meal plan, must first create user and log him in
Cypress.Commands.add('addItemsToMealplan', () => {
   cy.request({
      url: '/api/mealplan',
      method: 'POST',
      body: {
         date: format(startOfToday(), 'yyyy-MM-dd'),
         slot: 1,
         position: 0,
         fdc_id: 1936614,
         servings: 2,
         brand_owner: 'Paramount Foods, LLC',
         description: 'Wasabi Green Peas',
         data_type: 'branded_food',
         serving_size: '100',
         serving_size_unit: 'g',
      },
   });
   cy.request({
      url: '/api/mealplan',
      method: 'POST',
      body: {
         date: format(startOfToday(), 'yyyy-MM-dd'),
         slot: 1,
         position: 0,
         fdc_id: 1936614,
         servings: 2,
         brand_owner: 'Paramount Foods, LLC',
         description: 'Wasabi Green Peas',
         data_type: 'branded_food',
         serving_size: '100',
         serving_size_unit: 'g',
      },
   });

   cy.request({
      url: '/api/mealplan',
      method: 'POST',
      body: {
         date: format(startOfToday(), 'yyyy-MM-dd'),
         slot: 1,
         position: 0,
         fdc_id: 1936614,
         servings: 2,
         brand_owner: 'Paramount Foods, LLC',
         description: 'Wasabi Green Peas',
         data_type: 'branded_food',
         serving_size: '100',
         serving_size_unit: 'g',
      },
   });
});
