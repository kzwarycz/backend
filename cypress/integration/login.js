
    it('Logs in with admin credentials', () => {
      cy.visit('/')
   
      cy.contains('Zaloguj się').first().click()
      cy.wait(1000)
   
      cy.get('input[placeholder="Username"]').first().type('admin')
      cy.get('input[placeholder="Password"]').first().type('admin')
   
      cy.contains('Login').first().click()
      cy.wait(1000)
      cy.contains('Wyloguj się').first().click()
    })
   