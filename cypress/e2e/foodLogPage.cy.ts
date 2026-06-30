describe('The Food Log Page', () => {
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

   it('Displays items from food log on the page', () => {
      cy.contains('Food Log').click();
      cy.findAllByTestId('food-search-item').should('have.length.of', 3);
   });
   it('Shows user their nutrients in food log compared to total nutrients goal', () => {
      cy.findAllByText("Today's Macronutrient Totals").should('exist');
   });

   it('Allows user to change the date via the tab', () => {
      cy.findByText('Monday').click();
      cy.findByText('Tuesday').click();
      cy.findByText('Wednesday').click();
      cy.contains(
         'You have no items saved on this day for your food log.'
      ).should('exist');
   });
});
