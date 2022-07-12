

describe('The Login Page', () => {
   
   // reset and seed the database prior to all test
   // before(() => {
   //    cy.task('db:seed');
   // });

   //then drop the database after all tests are completed
   after(() => {
      cy.task('db:teardown');
   });

   it('Successfully allows user to create an account', () => {
      cy.visit('/');
      cy.contains('Log in').click();
      cy.contains('Create Account').click();
      cy.findByPlaceholderText('Username').type('TEST_USER')
      cy.findByPlaceholderText('Email').type('testemail@testemail.com')
      cy.findByPlaceholderText('Password').type('password')
      cy.findByPlaceholderText('Confirm Password').type('password')
      cy.contains('Create Account').click();
      cy.contains('Female').click();
      cy.contains('Other').click()
      cy.findByTestId('age-input').type('{backspace}{backspace}27');
      cy.findByTestId('height-input').type('{backspace}{backspace}67')
      cy.findByTestId('weight-input').type('{backspace}{backspace}{backspace}150')
      cy.contains('Complete creating account').click();
      cy.contains('You have successfully created an account. Please login.').should('be.visible')
   });
   it('Allows user to login after creating an account', () => {
      cy.visit('/');
      cy.contains('Log in').click();
      cy.findByPlaceholderText('Username').type('TEST_USER');
      cy.findByPlaceholderText('Password').type('password');
      cy.findByTestId('login-btn').click();
      cy.get('.daily-goals').contains('1614').should('be.visible')
   })
});
