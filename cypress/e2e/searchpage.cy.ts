describe('The Search Page', () => {
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

   it('Allows user to search for recipes and add an item to their mealplan', () => {
      cy.findByTestId('query-text-field').type('chicken');
      cy.findByTestId('select-type-dropdown').click();
      cy.contains('Main Course').click();
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
      cy.findAllByTestId('open-addtomealplan-dialog').first().click();
      cy.findByTestId('add-mealplan-btn').click();
      cy.contains('Item has been added to your mealplan!').should('be.visible');
   });

   it('Allows user to search for grocery products ', () => {
      cy.findByTestId('select-search-input').click();
      cy.contains('Grocery Products').click();
      cy.findByTestId('query-text-field').type('yogurt');
      cy.findByTestId('select-type-dropdown').click();
      cy.contains('Main Course').click();
      cy.findAllByTestId('textfield-min-nutrient').first().type('50');
      cy.findAllByTestId('textfield-max-nutrient').first().type('400');
      cy.findAllByTestId('textfield-min-nutrient').eq(1).type('20'); //eq searches the index for correct item
      cy.findAllByTestId('textfield-max-nutrient').eq(1).type('65'); //eq searches the index for correct item
      cy.findAllByTestId('textfield-min-nutrient').eq(2).type('20'); //eq searches the index for correct item
      cy.findAllByTestId('textfield-max-nutrient').eq(2).type('45'); //eq searches the index for correct item
      cy.findAllByTestId('textfield-min-nutrient').last().type('10');
      cy.findAllByTestId('textfield-max-nutrient').last().type('25');
      cy.contains('Submit').click();
      cy.findAllByTestId('food-search-item').should('exist');
   });

   it('Allows user to search for menu items', () => {
      cy.findByTestId('select-search-input').click();
      cy.contains('Menu items').click();
      cy.findByTestId('query-text-field').type('hamburger');
      cy.findByTestId('select-type-dropdown').click();
      cy.contains('Main Course').click();
      cy.findAllByTestId('textfield-min-nutrient').first().type('50');
      cy.findAllByTestId('textfield-max-nutrient').first().type('400');
      cy.findAllByTestId('textfield-min-nutrient').eq(1).type('20'); //eq searches the index for correct item
      cy.findAllByTestId('textfield-max-nutrient').eq(1).type('65'); //eq searches the index for correct item
      cy.findAllByTestId('textfield-min-nutrient').eq(2).type('20'); //eq searches the index for correct item
      cy.findAllByTestId('textfield-max-nutrient').eq(2).type('45'); //eq searches the index for correct item
      cy.findAllByTestId('textfield-min-nutrient').last().type('10');
      cy.findAllByTestId('textfield-max-nutrient').last().type('25');
      cy.contains('Submit').click();
      cy.findAllByTestId('food-search-item').should('exist');
   });

   it('Allows user to use custom goals to search for items', () => {
      cy.contains('Suggested').click();
      cy.findByTestId('query-text-field').type('salad');
      cy.findByTestId('select-type-dropdown').click();
      cy.contains('Side Dish').click();
      cy.contains('Submit').click();
      cy.findAllByTestId('food-search-item').should('exist');
   });
});
