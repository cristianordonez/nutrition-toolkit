describe('The Login Page', () => {
   after(() => {
      cy.task('db:teardown'); //deletes all users and sessions from database
   });

   it('Successfully allows user to create an account', () => {
      cy.visit('/');
      cy.contains('Log in').click();
      cy.contains('Create Account').click();
      cy.findByPlaceholderText('Email').type('currenttestemail@email.com');
      cy.findByPlaceholderText('Password').type('password');
      cy.findByPlaceholderText('Confirm Password').type('password');
      cy.contains('Almost done').click();
      cy.contains('Female').click();
      cy.contains('Non-binary').click();
      cy.findByTestId('age-input').type('{backspace}{backspace}27');
      cy.findByTestId('height-input').type('{backspace}{backspace}67');
      cy.findByTestId('weight-input').type(
         '{backspace}{backspace}{backspace}150'
      );
      cy.contains('Complete creating account').click();
      cy.contains(
         'You have successfully created an account. Please login.'
      ).should('be.visible');
   });
   it('Allows user to login after creating an account', () => {
      cy.visit('/');
      cy.contains('Log in').click();
      cy.findByPlaceholderText('Email').type('currenttestemail@email.com');
      cy.findByPlaceholderText('Password').type('password');
      cy.findByTestId('login-btn').click();
      cy.findByText(
         'Change the current day by navigating through the tabs, or change the week by using the calendar dropdown to the right'
      ).should('be.visible');
      cy.logout();
   });
});
