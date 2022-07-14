describe('The Mealplan Page', () => {
   
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
 
    it('Should allow user to view their recipes', () => {
       cy.contains('Meal Plan').click();
      //  cy.addItemsToMealplan(); 
      // cy.request({
      //    url: '/api/mealplan/day',
      //    method: 'GET',
      //    qs: {
      //       date: '2020-05-15'
      //    },
      // })
    });

 });
  