it('allows the user to log out', () => {
    cy.visit('/');
    cy.contains('Zaloguj się');
  });
  