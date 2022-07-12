

describe('The Login Page', () => {
   
    // reset and seed the database prior to all test
    // before(() => {
    //    cy.task('db:seed');
    // });
 
    //then drop the database after all tests are completed
    after(() => {
       cy.task('db:teardown');
    });
 
    it('Should allow user to search for recipes', () => {
       cy.login();
       cy.logout();

    });
 
 });
 