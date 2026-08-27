describe('Login flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should login successfully', () => {
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login').as(
      'loginRequest',
    );

    cy.get('input[placeholder="Email"]').type('testingdummy@mail.com');

    cy.get('input[placeholder="Password"]').type('test1234');

    cy.contains('button', /^Login$/).click();

    cy.wait('@loginRequest').then((interception) => {
      console.log('LOGIN RESPONSE:', interception.response);
    });

    cy.contains('Threads', { timeout: 10000 }).should('be.visible');
  });
});
