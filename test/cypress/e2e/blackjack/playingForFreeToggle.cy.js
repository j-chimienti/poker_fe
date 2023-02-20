import {handleErrors} from "./handleErrors"
import {loginNoBalance, newSession} from "./login"

handleErrors()
describe("playing for free toggle", () => {
  it("start with free for anon user", () => {
    newSession()
    cy.dataCy("gameState").should("have.text", "bet")
    cy.dataCy("playingFor").should("have.text", 'FREE')
    cy.dataCy("playingForToggle").click()
    cy.dataCy("playingFor").should("have.text", 'BTC')
  })

  it("start with btc for user", () => {
    loginNoBalance()
    cy.dataCy("gameState").should("have.text", "bet")
    cy.dataCy("playingFor").should("have.text", 'BTC')
    cy.dataCy("playingForToggle").click()
    cy.dataCy("playingFor").should("have.text", 'FREE')
  })

})
