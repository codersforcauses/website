/// <reference path="../support/index.d.ts" />

describe('Test Footer', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has branding', () => {
    cy.get('[data-cy=footer]').find('img').should('be.visible')

    cy.get('[data-cy=footer]')
      .get('.copyright')
      .contains('Copyright')
      .should('be.visible')
  })

  it('has navigation to /branding', () => {
    cy.get('[data-cy=branding]').click()
    cy.url().should('include', '/branding')
  })

  it('has navigation to /contact', () => {
    cy.get('[data-cy=contact]').click()
    cy.url().should('include', '/contact')
  })

  it('has navigation to /projects', () => {
    cy.get('[data-cy=projects]').click()
    cy.url().should('include', '/projects')
  })
})
