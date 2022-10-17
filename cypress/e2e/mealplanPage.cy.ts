describe('The Mealplan Page', () => {
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

   it('Displays meals from mealplan on the page', () => {
      cy.contains('Meal Plan').click();
      cy.findAllByTestId('food-search-item').should('have.length.of', 3);
   });
   it('Shows user their nutrients in meal plan compared to total nutrients goal', () => {
      cy.findAllByText("Today's Macronutrient Totals").should('exist');
   });

   it('Allows user to delete items from their mealplan, then show the updated nutrients', () => {
      cy.findAllByTestId('food-search-item').should('have.length.of', 3);
      cy.findAllByLabelText('delete from mealplan').should('exist');
      cy.findAllByLabelText('delete from mealplan').first().click();
      cy.findAllByTestId('food-search-item').should('have.length.of', 2);
   });

   it('Allows user to change the date via the tab', () => {
      cy.findByText('Monday').click();
      cy.findByText('Tuesday').click();
      cy.findByText('Wednesday').click();
      cy.contains(
         'You have no items saved on this day for your mealplan.'
      ).should('exist');
   });
   it('Allows user to change the date via the textfield component and displays info message when there are no items saved', () => {
      cy.findByTestId('CalendarIcon').click();
      cy.findByText('15').click();
      cy.contains(
         'You have no items saved on this day for your mealplan.'
      ).should('exist');
   });
});
