import getUnixTime from 'date-fns/getUnixTime';

describe('The Mealplan Page', () => {
   //create user before all tests
   before(() => {
      cy.signup();
      // cy.addItemsToMealplan();
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

   //  it('Should give user an info warning when there are no recipes saved', () => {
   //     cy.contains('Meal Plan').click();
   //     cy.contains(
   //        'You have no items saved on this day for your mealplan.'
   //     ).should('exist');
   //  });
   it.only('Should display meals on page', () => {
      // cy.addItemsToMealplan();
      // cy.contains('Meal Plan').click();
      // cy.contains('Suggested Goals').click();
      // cy.findByTestId('query-text-field').type('salad');
      // cy.findByTestId('select-type-dropdown').click();
      // cy.contains('Side Dish').click();
      // cy.contains('Submit').click();
      // cy.contains('Add to Mealplan').first().click();
      // cy.findByTestId('CalendarIcon').click();
      // cy.contains('15').click();
      // cy.findByTestId('add-mealplan-btn').click();
      // cy.contains('Meal Plan').click();
      // cy.pause();
      cy.request({
         url: '/api/mealplan',
         method: 'POST',
         body: {
            date: getUnixTime(new Date(Date.now())),
            slot: 1,
            position: 0,
            type: 'RECIPE',
            value: {
               id: 296213,
               servings: 2,
               title: 'Spinach Salad with Roasted Vegetables and Spiced Chickpea',
               imageType: 'jpg',
            },
         },
      });
      cy.request({
         url: '/api/mealplan',
         method: 'POST',
         body: {
            date: getUnixTime(new Date(Date.now())),
            slot: 1,
            position: 0,
            type: 'PRODUCT',
            value: {
               id: 183433,
               servings: 1,
               title: 'Ahold Lasagna with Meat Sauce',
               imageType: 'jpg',
            },
         },
      });

      cy.request({
         url: '/api/mealplan',
         method: 'POST',
         body: {
            date: getUnixTime(new Date(Date.now())),
            slot: 1,
            position: 0,
            type: 'MENU_ITEM',
            value: {
               id: 378557,
               servings: 1,
               title: 'Pizza 73 BBQ Steak Pizza, 9',
               imageType: 'png',
            },
         },
      });
      cy.contains('Meal Plan').click();
   });
});
