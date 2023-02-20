import { handleErrors } from "./handleErrors"
import { makeUrl, waitForWebsocket } from "./login"

function signup(un, pw, expectedStatus) {
  cy.clearCookies()
  cy.intercept("GET", makeUrl("/api/auth/resumeOrNewSession")).as("SESSION")
  cy.intercept("POST", makeUrl("/api/auth/signup")).as("SIGNUP")
  cy.visit("/")
  cy.wait("@SESSION").its("response.statusCode").should("eq", 200)
  waitForWebsocket()
  cy.dataCy("drawerList").trigger("mouseover")
  cy.dataCy("signupBtn").first().click()
  cy.dataCy("goToSignup").click()
  cy.get("input[type=email]").type(un)
  cy.dataCy("password").type(`${pw}`) // enter causes form to submit
  cy.dataCy("passwordVerify").type(`${pw}{enter}`) // enter causes form to submit
  cy.wait("@SIGNUP").its("response.statusCode").should("eq", expectedStatus)
  if (201 === expectedStatus) {
    cy.contains(`Created playerAccount ${un}`)
  }
  // cy.contains("deal")
  // cy.contains("bet")
}

handleErrors()

describe("signup", () => {
  const un = `TEST_USER_${new Date().getTime()}@gmail.com`

  it("can signup new user", () => {
    signup(un, "TESTING_TESTING", 201)
    cy.dataCy("email").should("have.text", un.toLowerCase())
  })
  it("can fail signup new user when already exists", () => {
    signup(un, "TESTING_TESTING", 400)
    cy.contains("Failed to signup")
  })
})
