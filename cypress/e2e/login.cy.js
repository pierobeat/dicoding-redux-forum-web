describe('Login flow', () => {
  it('should login successfully', () => {
    cy.visit('http://localhost:5173/login');

    cy.get('input[placeholder="Email"]').type('testingdummy@mail.com');

    cy.get('input[placeholder="Password"]').type('test1234');

    cy.contains('button', 'Login').click();

    cy.url().should('not.include', '/login');
  });
});
