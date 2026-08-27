describe('Login flow', () => {
  it('should display homepage after successful login', () => {
    cy.visit('/login');

    cy.get('input[placeholder="Email"]').type('testingdummy@mail.com');

    cy.get('input[placeholder="Password"]').type('test1234');

    cy.contains('button', /^Login$/).click();

    cy.url().should('not.include', '/login');
  });
});
