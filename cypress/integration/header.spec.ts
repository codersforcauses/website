/// <reference path="../support/index.d.ts" />

const testNavButton = (buttonId: string, url: string) => {
  cy.get(`[data-cy=nav-${buttonId}]`).click()
  cy.url().should('eq', Cypress.config().baseUrl + `${url}`)
}

const navigationTests = () => {
  it('should be able to navigate home page', () => testNavButton('Home', '/'))
  it('should be able to navigate to /about', () => testNavButton('About', '/about'))
  it('should be able to navigate to /events', () => testNavButton('Events', '/events'))
  it('should be able to navigate to /projects', () => testNavButton( 'Projects', '/projects'))
}

describe('Test Desktop Navbar', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  navigationTests()
})

describe('Test Mobile Navbar', () => {
  beforeEach(() => {
    cy.viewport('iphone-5')
    cy.visit('/')
    cy.get('[id="Menu"]').click()
  })

  navigationTests()
})
