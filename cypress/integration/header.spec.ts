/// <reference path="../support/index.d.ts" />

const testNavButton = (buttonId: string, title: string, url: string) => {
  cy.get(`[data-cy=nav-${buttonId}]`)
    .click()
  cy.url().should('eq', Cypress.config().baseUrl + `${url}`);
  cy.get('[data-cy=typer]')
        .contains(`./${title}`)

}

describe('Test Desktop Navbar', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  it('should be able to navigate home page', () => {
    testNavButton("Home", "Innovation with a mission", '/');
  })

  it('should be able to navigate to /about', () => {
    testNavButton("About", "about", '/about')
  })

  it('should be able to navigate to /events', () => {
    testNavButton("Events", "events", '/events')
  })

  it('should be able to navigate to /projects', () => {
    testNavButton("Projects", "projects", '/projects')
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
    cy.contains('./Innovation with a mission')
  })

  it('should be able to navigate to /about', () => {
    cy.get('[data-tid="nav-About"]').click()
    cy.contains('./about')
  })

  it('should be able to navigate to /events', () => {
    cy.get('[data-tid="nav-Events"]').click()
    cy.contains('./events')
  })

  it('should be able to navigate to /projects', () => {
    cy.get('[data-tid="nav-Projects"]').click()
    cy.contains('./projects')
  })
})
