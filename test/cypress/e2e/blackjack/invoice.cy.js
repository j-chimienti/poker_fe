import {handleErrors} from "./handleErrors"
import {newSession} from "./login"

handleErrors()

describe("invoice", () => {
  it("creates invoice", () => {
    newSession()
    cy.dataCy("invoiceIsUnpaid").should("have.text", "false")
    cy.dataCy("drawerList").trigger("mouseover")
    // cy.dataCy("openDrawerBtn").click()
    cy.dataCy("submitInvoiceBtn").click()
    cy.dataCy("invoiceIsUnpaid").should("have.text", "true")
  })
})
