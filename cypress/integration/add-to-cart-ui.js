
it('Test adding to cart', () => {
    cy.visit('/')
    cy.contains('Zobacz menu').click({ force: true });;
    cy.wait(1000)
    cy.contains('button', 'dodaj do koszyka').click({ force: true });
})
   