/// <reference types="Cypress" />

it('should render', () => {
  cy.visit('http://localhost:3000')
  cy.contains('Coders for Causes')
})

it('should be able to navigate', () => {
  cy.visit('http://localhost:3000')
  cy.get('[data-tid="nav-Events"]').click()
  cy.contains('Events')

  cy.get('[data-tid="nav-Projects"]').click()
  cy.contains('404')

  cy.get('[data-tid="nav-About"]').click()
  cy.contains('404')
})
