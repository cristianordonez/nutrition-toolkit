describe('The Search Page', () => {
   
    //create user before all tests
    before(() => {
      cy.signup()
    });
 beforeEach(() => {
   cy.login();
 })
 afterEach(() => {
   cy.logout();
 })
    //then drop the database after all tests are completed
    after(() => {
       cy.task('db:teardown');
    });
 
    it('Should allow user to search for recipes and add an item to their mealplan', () => {
      cy.findByTestId('query-text-field').type('chicken');
      cy.findByTestId('select-type-dropdown').click();
      cy.contains('Main Course').click();
      cy.findAllByTestId('textfield-min-nutrient').first().type('100')
      cy.findAllByTestId('textfield-max-nutrient').first().type('1000')
      cy.findAllByTestId('textfield-min-nutrient').eq(1).type('20') //eq searches the index for correct item
      cy.findAllByTestId('textfield-max-nutrient').eq(1).type('65') //eq searches the index for correct item
      cy.findAllByTestId('textfield-min-nutrient').eq(2).type('20') //eq searches the index for correct item
      cy.findAllByTestId('textfield-max-nutrient').eq(2).type('45') //eq searches the index for correct item
      cy.findAllByTestId('textfield-min-nutrient').last().type('10')
      cy.findAllByTestId('textfield-max-nutrient').last().type('25')
      cy.contains('Submit').click();
      expect(cy.contains('Results')).toBeDefined()
      cy.contains('Add to Mealplan').first().click();
      cy.findByTestId('CalendarIcon').click();
      cy.contains('15').click();
      cy.findByTestId('add-mealplan-btn').click();
      cy.contains('Item has been added to your mealplan!').should('be.visible');
    });

    it('Should allow user to search for grocery products and add an item to their mealplan', () => {
       cy.findByTestId('select-search-input').click();
       cy.contains('Grocery Products').click();
       cy.findByTestId('query-text-field').type('yogurt');
     cy.findByTestId('select-type-dropdown').click();
     cy.contains('Main Course').click();
     cy.findAllByTestId('textfield-min-nutrient').first().type('50')
     cy.findAllByTestId('textfield-max-nutrient').first().type('400')
     cy.findAllByTestId('textfield-min-nutrient').eq(1).type('20') //eq searches the index for correct item
     cy.findAllByTestId('textfield-max-nutrient').eq(1).type('65') //eq searches the index for correct item
     cy.findAllByTestId('textfield-min-nutrient').eq(2).type('20') //eq searches the index for correct item
     cy.findAllByTestId('textfield-max-nutrient').eq(2).type('45') //eq searches the index for correct item
     cy.findAllByTestId('textfield-min-nutrient').last().type('10') 
     cy.findAllByTestId('textfield-max-nutrient').last().type('25') 
     cy.contains('Submit').click();
     expect(cy.contains('Results')).toBeDefined()
   });

   it('Should allow user to search for menu items and add an item to their mealplan', () => {
      cy.findByTestId('select-search-input').click();
      cy.contains('Menu items').click();
      cy.findByTestId('query-text-field').type('hamburger');
    cy.findByTestId('select-type-dropdown').click();
    cy.contains('Main Course').click();
    cy.findAllByTestId('textfield-min-nutrient').first().type('50')
    cy.findAllByTestId('textfield-max-nutrient').first().type('400')
    cy.findAllByTestId('textfield-min-nutrient').eq(1).type('20') //eq searches the index for correct item
    cy.findAllByTestId('textfield-max-nutrient').eq(1).type('65') //eq searches the index for correct item
    cy.findAllByTestId('textfield-min-nutrient').eq(2).type('20') //eq searches the index for correct item
    cy.findAllByTestId('textfield-max-nutrient').eq(2).type('45') //eq searches the index for correct item
    cy.findAllByTestId('textfield-min-nutrient').last().type('10') 
    cy.findAllByTestId('textfield-max-nutrient').last().type('25') 
    cy.contains('Submit').click();
    expect(cy.contains('Results')).toBeDefined()
  });

 });
 