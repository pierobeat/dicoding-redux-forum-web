describe('Login flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should login successfully', () => {
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        status: 'success',
        data: { token: 'dummy_token' },
      },
    }).as('loginRequest');

    cy.intercept('GET', '**/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        data: { user: { id: 'user-1', name: 'testingdummy' } },
      },
    });

    cy.get('input[placeholder="Email"]').type('testingdummy@mail.com');
    cy.get('input[placeholder="Password"]').type('test1234');

    cy.contains('button', /^Login$/).click();

    cy.wait('@loginRequest');

    cy.get('.home-page', { timeout: 10000 }).should('be.visible');
  });
});
