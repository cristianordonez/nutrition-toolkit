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

//custom command to login user
Cypress.Commands.add('login', (userType, options = {}) => {
  


   cy.request({
    url: '/api/signup',
    method: 'POST',
    body: {
        username: 'TEST_USER',
        email: 'testemail@testemail.com',
        password: 'password',
    }
   })
    cy.request({
        url: '/api/metrics',
        method: 'POST',
        body:   {
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
          }
    })
     let response = cy.request({
        url: '/api/login',
        method: 'POST',
        body: {
            username: 'TEST_USER',
            password: 'password'
        }
    })
   cy.visit(`/123/search`)
});

//todo custom command to logout user
Cypress.Commands.add('logout', () => {
    cy.contains('Login').should('not.exist')
    cy.findByTestId('avatar').click()
    cy.contains('Logout').click()
  })