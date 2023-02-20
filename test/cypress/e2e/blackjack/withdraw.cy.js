import { newSession } from "./login"

describe("withdraw", () => {
  it("fails to withdraw w/ bad bolt11", () => {
    newSession()
    cy.dataCy("drawerList").trigger("mouseover")
    // allows submit w/ bad bolt11
    cy.dataCy("bolt11Withdraw").type("lnbckdkdkdkdk{enter}")
    // since bad bolt11 json fails
    // No inbound message handler for type {"WsBolt11DebitRequest":null,"bolt11":"lnbckdkdkdkdk"}
    cy.contains("No inbound message handler")
  })
  it("fails to submit form w/ input=1", () => {
    newSession()
    cy.dataCy("drawerList").trigger("mouseover")
    cy.dataCy("bolt11Withdraw").type("1{enter}")
    cy.contains("Invalid invoice")
  })

  it("button triggers form submit but error with input=123", () => {
    newSession()
    cy.dataCy("drawerList").trigger("mouseover")
    cy.dataCy("bolt11Withdraw").type("123")
    cy.dataCy("bolt11WithdrawBtn").click()
    cy.contains("Invalid invoice")
  })
})
