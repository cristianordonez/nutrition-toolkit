describe('The Mealplan Page', () => {
   //create user before all tests
   before(() => {
      cy.signup();
   });

   beforeEach(() => {
      cy.login();
   });
   afterEach(() => {
      cy.logout();
   });
   //then drop the database after all tests are completed
   after(() => {
      cy.task('db:teardown');
   });

   it('Gives user an info warning when there are no recipes saved', () => {
      cy.contains('Meal Plan').click();
      cy.contains(
         'You have no items saved on this day for your mealplan.'
      ).should('exist');
   });

   it('Displays meals from mealplan on the page', () => {
      cy.addItemsToMealplan();
      cy.contains('Meal Plan').click();
      cy.findAllByTestId('food-search-item').should('have.length.of', 3);
   });
   it('Shows user their nutrients in meal plan compared to total nutrients goal', () => {
      cy.addItemsToMealplan();
      cy.contains('Meal Plan').click();
      cy.findByText("Today's Macronutrient Totals").should('exist');
   });

   it('Allows user to change the date via the tab', () => {
      cy.contains('Meal Plan').click();
      cy.findByText('Monday').click();
      cy.findByText('Tuesday').click();
      cy.findByText('Wednesday').click();
      cy.contains(
         'You have no items saved on this day for your mealplan.'
      ).should('exist');
   });

   // it('Allows user to change the date via the textfield component', () => {
   //    cy.contains('Meal Plan').click();
   //    cy.findByTestId('CalendarIcon').click();
   //    cy.findByText('15').click();
   //    cy.contains(
   //       'You have no items saved on this day for your mealplan.'
   //    ).should('exist');
   // });

   it('Allows user to delete items from their mealplan, then show the updated nutrients', () => {
      cy.contains('Meal Plan').click();
      cy.findAllByTestId('food-search-item').should('have.length.of', 3);
      cy.findAllByLabelText('delete from mealplan').should('exist');
      cy.findAllByLabelText('delete from mealplan').click();
      cy.findByText('Delete').click();
      cy.findAllByTestId('food-search-item').should('have.length.of', 2);
   });
});
