describe('The MacroCalculator Page', () => {
   //create user before all tests
   before(() => {
      cy.signup();
      cy.login();
   });

   //then drop the database after all tests are completed
   after(() => {
      cy.logout();
      cy.task('db:teardown');
   });

   it('Allows user to update their metrics', () => {
      cy.contains('Macro Calculator').click();
      cy.contains('Female').click();
      cy.contains('Non-binary').click();
      cy.findByTestId('age-input').type('{backspace}{backspace}27');
      cy.findByTestId('height-input').type('{backspace}{backspace}67');
      cy.findByTestId('weight-input').type(
         '{backspace}{backspace}{backspace}150'
      );
      cy.findByTestId('recalculate-btn').click();
      cy.contains('Confirm').click();
      cy.contains('You have updated your macronutrient needs.').should(
         'be.visible'
      );
   });
});
