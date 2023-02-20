import { newSession } from "./login"
import { handleErrors } from "./handleErrors"

import {BET} from "../../../../src/constants"

handleErrors()

function changeBet(amt, assert = true) {
  cy.dataCy("betAmount").should("be.visible").first().clear().type(amt)
  if (assert) {
    cy.dataCy("betAmount").should("have.value", amt)
    cy.dataCy("bet").should("have.text", amt)
  }
}

describe("bet", () => {
  it("can increment", () => {
    newSession()
    // have multiple forms due to mobile / desktop
    cy.dataCy("playingForToggle").should("be.visible").first().click()
    cy.dataCy("playingFor").should("have.text", "BTC")
    cy.dataCy("betAmount").should("have.value", "100")
    cy.dataCy("bet").should("have.text", "100")
    changeBet(300)
    changeBet(-300)
    cy.contains("Min " + BET.MIN)
    cy.dataCy("dealBtn").click()
    cy.contains("Invalid bet=-300")
    changeBet(1000000)
    cy.contains("Max " + BET.MAX)
    cy.dataCy("dealBtn").click()
    cy.contains("Invalid bet=1000000")
    // saved to local storage
    newSession()
    cy.dataCy("bet").should("have.text", "1000000")

  })
})
