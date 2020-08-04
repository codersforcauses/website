/// <reference path="../support/index.d.ts" />

describe('Test Footer', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has branding', () => {
    cy.get('[data-cy=footer]').find('img').should('be.visible')

    cy.get('[data-cy=footer]')
      .get('[data-cy=copyrightnotice]')
  })

  it('has navigation to /branding', () => {
    cy.get('[data-cy=branding]').click({ force: true })
    cy.url().should('include', '/branding')
  })

  it('has navigation to /projects', () => {
    cy.get('[data-cy=projects]').click({ force: true })
    cy.url().should('include', '/projects')
  })

  it('should have content', () => {
    cy.get('[data-cy=footer]').contains('Terms').should('be.visible')
    cy.get('[data-cy=footer]').contains('Privacy').should('be.visible')
    cy.get('[data-cy=footer]').contains('Security').should('be.visible')
    cy.get('[data-cy=footer]').contains('Constitution').should('be.visible')
  })
})
