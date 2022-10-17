describe('The Search Page', () => {
   before(() => {
      cy.signup();
      cy.login();
   });

   after(() => {
      cy.logout();
      cy.task('db:teardown');
   });

   it('Allows user to search for recipes and add an item to their mealplan', () => {
      cy.findByTestId('query-text-field').type('chicken');
      cy.findAllByTestId('textfield-min-nutrient').first().type('100');
      cy.findAllByTestId('textfield-max-nutrient').first().type('1000');
      cy.findAllByTestId('textfield-min-nutrient').eq(1).type('20'); //eq searches the index for correct item
      cy.findAllByTestId('textfield-max-nutrient').eq(1).type('65'); //eq searches the index for correct item
      cy.findAllByTestId('textfield-min-nutrient').eq(2).type('20'); //eq searches the index for correct item
      cy.findAllByTestId('textfield-max-nutrient').eq(2).type('45'); //eq searches the index for correct item
      cy.findAllByTestId('textfield-min-nutrient').last().type('10');
      cy.findAllByTestId('textfield-max-nutrient').last().type('25');
      cy.contains('Submit').click();
      cy.findAllByTestId('food-search-item').should('exist');
      cy.findAllByTestId('food-search-item').first().click();
      cy.findByTestId('add-mealplan-btn').click();
      cy.contains('Item has been added to your mealplan!').should('be.visible');
   });

   it('Allows user to use custom goals to search for items', () => {
      cy.contains('Simple').click();
      cy.findAllByTestId('query-text-field').first().type(' salad');
      cy.contains('Submit').click();
      cy.findAllByTestId('food-search-item').should('exist');
   });
});
