it('fetches items in the cart', () => {
    cy.request('GET', 'http://localhost:3001/cart').then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('cart');
    });
  });
  