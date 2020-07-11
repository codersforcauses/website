/// <reference path="../support/index.d.ts" />

describe('Test Footer', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('should have content', () => {
    cy.get('.footer').find('img').should('be.visible')
    cy.get('.footer')
      .contains('© 2020 Coders for Causes')
      .contains('Terms')
      .contains('Privacy')
      .contains('Security')
      .contains('Constitution')
      .should('be.visible')
    cy.get('.footer').contains('Made with ').should('be.visible')
  })

  it('second column', () => {
    cy.get('.footer').contains('About us').should('be.visible')
    cy.get('.footer').contains('Projects').click()
    cy.get('.footer').contains('Events').click()
  })
})
