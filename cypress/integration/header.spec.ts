/// <reference path="../support/index.d.ts" />

const testNavButton = (buttonId: string, url: string) => {
  cy.get(`[data-cy=nav-${buttonId}]`)
    .click()
  cy.url().should('eq', Cypress.config().baseUrl + `${url}`);
}

const createNavTest = (msg: string, buttonId: string, url: string) => () => it(msg, () => { testNavButton(buttonId, url) })

const navTest = [
  createNavTest('should be able to navigate home page', 'Home', '/'),
  createNavTest('should be able to navigate to /about', 'About', '/about'),
  createNavTest('should be able to navigate to /events', 'Events', '/events'),
  createNavTest('should be able to navigate to /projects', 'Projects', '/projects')
]


describe('Test Desktop Navbar', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

  navTest.forEach( (test) => test() )

})

describe('Test Mobile Navbar', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.viewport('iphone-5')
    cy.visit('/')
    cy.get('[id="Menu"]').click()
  })

  navTest.forEach( (test) => test() )

})
