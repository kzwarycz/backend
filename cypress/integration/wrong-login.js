it('prevents login with incorrect credentials', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3001/login',
      body: {
        email: 'wrong',
        password: 'credentials'
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(401);
    });
  });
  