it('adds an item to the cart', () => {
    cy.request('POST', 'http://localhost:3001/cart', {
      restaurant: 'meksykanska',
      itemName: 'Taco'
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Dodano do koszyka');
    });
  });
  