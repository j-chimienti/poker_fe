import { handleErrors } from "./handleErrors"
import { newSession } from "./login"

handleErrors()
describe("game", () => {
  // todo: test when leave game and return
  it("play 1 game for free", () => {
    newSession()
    cy.dataCy("gameState").should("have.text", "bet")
    cy.dataCy("playingFor").should("have.text", 'FREE')
    cy.dataCy("dealBtn").click()
    // what if blackjack
    cy.dataCy("nCards").should("have.text", 2)
    cy.dataCy("hand").should("not.have.text", null)
    cy.dataCy("gameState").should("have.text", "move")
    cy.dataCy("standBtn").click()
    cy.dataCy("gameState").should("have.text", "bet")
  })

  it.skip("can LOSE game", () => {
    newSession()
    cy.dataCy("gameState").should("have.text", "bet")
    cy.dataCy("dealBtn").click()
    cy.dataCy("gameState").should("have.text", "move")
    cy.dataCy("gameState").should("have.text", "bet")
  })
})
