it('places an order successfully', () => {
    cy.request('POST', 'http://localhost:3001/order/place', { cart: [] }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Order placed successfully');
    });
  });
  