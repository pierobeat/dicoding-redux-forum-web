describe('Login flow', () => {
  it('should login successfully', () => {
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login').as(
      'loginRequest',
    );

    cy.visit('/login');

    cy.get('input[placeholder="Email"]').type('testingdummy@mail.com');

    cy.get('input[placeholder="Password"]').type('test1234');

    cy.contains('button', /^Login$/).click();

    cy.wait('@loginRequest').then((interception) => {
      console.log('LOGIN RESPONSE:', interception.response);
    });

    cy.contains('Threads').should('be.visible');
  });
});
