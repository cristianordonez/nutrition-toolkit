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
import 'cypress-jest-adapter';
import '@testing-library/cypress/add-commands';

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
         username: 'TEST_USER',
         email: 'testemail@testemail.com',
         password: 'password',
      },
   });
   cy.request({
      url: '/api/metrics',
      method: 'POST',
      body: {
         total_carbohydrates: 200,
         min_carbs_per_meal: 20,
         max_carbs_per_meal: 40,
         total_protein: 85,
         min_protein_per_meal: 20,
         max_protein_per_meal: 35,
         total_fat: 75,
         min_fat_per_meal: 10,
         max_fat_per_meal: 25,
         total_calories: 2000,
         min_calories_per_meal: 400,
         max_calories_per_meal: 650,
      },
   });
});

//custom command to create account AND login user
Cypress.Commands.add('login', () => {
   let response = cy.request({
      url: '/api/login',
      method: 'POST',
      body: {
         username: 'TEST_USER',
         password: 'password',
      },
   });
   cy.visit(`/search`);
});

// custom command to logout user
Cypress.Commands.add('logout', () => {
   cy.contains('Login').should('not.exist');
   cy.findByTestId('avatar').click();
   cy.findByTestId('logout-btn').click();
});

//sends request to add items to meal plan, must first create user and log him in
Cypress.Commands.add('addItemsToMealplan', () => {
   cy.request({
      url: '/api/mealplan',
      method: 'POST',
      body: {
         date: new Date(Date.now()),
         slot: 1,
         position: 0,
         type: 'RECIPE',
         value: {
            id: 296213,
            servings: 2,
            title: 'Spinach Salad with Roasted Vegetables and Spiced Chickpea',
            imageType: 'jpg',
         },
      },
   });
   cy.request({
      url: '/api/mealplan',
      method: 'POST',
      body: {
         date: new Date(Date.now()),
         slot: 1,
         position: 0,
         type: 'PRODUCT',
         value: {
            id: 183433,
            servings: 1,
            title: 'Ahold Lasagna with Meat Sauce',
            imageType: 'jpg',
         },
      },
   });

   cy.request({
      url: '/api/mealplan',
      method: 'POST',
      body: {
         date: new Date(Date.now()),
         slot: 1,
         position: 0,
         type: 'MENU_ITEM',
         value: {
            id: 378557,
            servings: 1,
            title: 'Pizza 73 BBQ Steak Pizza, 9',
            imageType: 'png',
         },
      },
   });
});
