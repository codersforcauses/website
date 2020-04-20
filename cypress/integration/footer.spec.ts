/// <reference path="../support/index.d.ts" />

describe('Test Footer', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('first column', () => {
    cy.get('.footer').find('img').should('be.visible')
    cy.get('.footer')
      .contains('Copyright')
      .contains('Coders for Causes')
      .should('be.visible')
    cy.get('.footer').contains('Made with ').should('be.visible')
  })

  it('second column', () => {
    cy.get('.footer').contains('About us').should('be.visible')
    cy.get('.footer').contains('What we do').click()
    cy.contains('We build software for charities').should('be.visible')
    // cy.get('.footer').contains('Made with ').should('be.visible')
  })

  // it('should be able to navigate to /about', () => {
  //   cy.get('[data-tid="nav-About"]').click()
  //   cy.contains('./about')
  // })

  // it('should be able to navigate to /events', () => {
  //   cy.get('[data-tid="nav-Events"]').click()
  //   cy.contains('./events')
  // })

  // it('should be able to navigate to /projects', () => {
  //   cy.get('[data-tid="nav-Projects"]').click()
  //   cy.contains('./projects')
  // })
})
