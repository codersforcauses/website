/// <reference path="../support/index.d.ts" />

describe('Test Desktop Navbar', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('should be able to navigate home page', () => {
    cy.get('[id="Home"]').click()
    cy.contains('Let\'s talk.')
  })

  it('should be able to navigate to /about', () => {
    cy.get('[data-tid="nav-About"]').click()
    cy.contains('Meet the Team')
  })

  it('should be able to navigate to /events', () => {
    cy.get('[data-tid="nav-Events"]').click()
    cy.contains('Workshops')
  })

  it('should be able to navigate to /projects', () => {
    cy.get('[data-tid="nav-Projects"]').click()
    cy.contains('Ignite Mentoring')
  })
})

describe('Test Mobile Navbar', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.viewport('iphone-5')
    cy.visit('/')
    cy.get('[id="Menu"]').click()
  })

  it('should be able to navigate home page', () => {
    cy.get('[id="Home"]').click()
    cy.contains('Let\'s talk.')
  })

  it('should be able to navigate to /about', () => {
    cy.get('[data-tid="nav-About"]').click()
    cy.contains('Meet the Team')
  })

  it('should be able to navigate to /events', () => {
    cy.get('[data-tid="nav-Events"]').click()
    cy.contains('Workshops')
  })

  it('should be able to navigate to /projects', () => {
    cy.get('[data-tid="nav-Projects"]').click()
    cy.contains('Ignite Mentoring')
  })
})
