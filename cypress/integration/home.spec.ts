/// <reference path="../support/index.d.ts" />

describe('Test desktop element visibility', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('smiley should wink on mouseover', () => {
    cy.get('[data-cy=face]').contains(':)')
    cy.get('[data-cy=face]').trigger('mouseover', { force: true }).contains(';)')
  })
})
