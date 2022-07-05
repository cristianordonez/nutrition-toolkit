describe('The Login Page', () => {
   beforeEach(() => {
      // reset and seed the database prior to every test
      cy.task('db:seed');
   });

   afterEach(() => {
      cy.task('db:teardown');
   });
   it('first test', () => {
      cy.visit('/');
   });
});
