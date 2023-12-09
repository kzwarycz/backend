it('displays available restaurants', () => {
    cy.visit('/');
    cy.get('ul').children().should('have.length', 7);
  });
  