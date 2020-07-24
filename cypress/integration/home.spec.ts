/// <reference path="../support/index.d.ts" />

describe('Test desktop element visibility', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('smiley should wink on mouseover', () => {
    cy.get('.face')
      .contains(':)')
    cy.get('.face')
      .trigger('mouseover')
      .contains(';)')
  })
})
