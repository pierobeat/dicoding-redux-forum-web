describe('Login flow', () => {
  it('should display homepage after successful login', () => {
    cy.visit('/login');

    cy.get('input[placeholder="Email"]').type('testingdummy@mail.com');

    cy.get('input[placeholder="Password"]').type('test1234');

    cy.contains('button', /^Login$/).click();

    cy.get('.home-page').should('be.visible');
  });
});
