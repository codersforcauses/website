/// <reference path="../support/index.d.ts" />

describe('Test Footer', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('should have content', () => {
    cy.get('.footer').find('img').should('be.visible')
    cy.get('.footer').contains('© 2020 Coders for Causes').should('be.visible')
    cy.get('.footer').contains('Terms').should('be.visible')
    cy.get('.footer').contains('Privacy').should('be.visible')
    cy.get('.footer').contains('Security').should('be.visible')
    cy.get('.footer').contains('Constitution').should('be.visible')
    cy.get('.footer').contains('Made with ').should('be.visible')
  })

  it('second column', () => {
    cy.get('.footer').contains('About us').should('be.visible')
    cy.get('.footer').contains('Projects').should('be.visible')
    cy.get('.footer').contains('Events').should('be.visible')
  })
})
