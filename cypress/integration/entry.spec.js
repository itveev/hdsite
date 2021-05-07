describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://youdesk.io');
    // cy.visit('localhost:3000');
    cy.contains('Log in').click();
    cy.url().should('include', '/login');
    cy.get('input').type('igor');
    cy.contains('Continue').click();
    cy.url().should('include', 'igor');
    cy.url().should('include', '/signin');
    cy.get('#email').type('bladeofdead@ya.ru');
    cy.get('#password').type('1');
    cy.contains('a', 'Sign in').click();
    cy.url().should('include', '/tickets');
  });
});
