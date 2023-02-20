import {players} from "../../fixtures/players.json"

export const noBalance = players.TEST_USER_ZERO_BALANCE
export const withBalance = players.TEST_USER_WITH_BALANCE
const usingProxy = Cypress.config("baseUrl").includes("bjack.space")

export function loginNoBalance() {
  return login(noBalance.username, noBalance.password, 200)
}

export function makeUrl(u) {
  return usingProxy ? "/api/?apiurl=https://api.bjack.space" + u : u
}

export function newSession() {
  cy.intercept("GET", makeUrl("/api/auth/resumeOrNewSession")).as("SESSION")
  cy.visit("/")
  cy.wait("@SESSION").its("response.statusCode").should("eq", 200)
  waitForWebsocket()
  cy.dataCy("balance").should("have.text", "0")
  cy.dataCy("email").should("contain.text", "session")
  cy.dataCy("playingFor").should("have.text", "FREE")
}

export function login(un, pw, expectedStatus = 200) {
  cy.intercept("GET", makeUrl("/api/auth/resumeOrNewSession")).as("SESSION")
  cy.intercept("POST", makeUrl("/api/auth/login")).as("LOGIN")
  cy.intercept("GET", makeUrl("/api/auth/logout")).as("LOGOUT")
  cy.visit("/")
  cy.wait("@SESSION").its("response.statusCode").should("eq", 200)
  waitForWebsocket()
  cy.dataCy("drawerList").trigger("mouseover")
  cy.dataCy("signupBtn").first().click()
  cy.get("input[type=email]").type(un)
  cy.get('input[name="password"]').type(`${pw}{enter}`) // enter causes form to submit
  cy.wait("@LOGIN").then(({ request, response }) => {
    expect(response.statusCode).to.equal(expectedStatus)
    if (expectedStatus === 200)
      expect(response.body.playerAccount.email).to.equal(
        un.replaceAll(" ", "").toLowerCase()
      )
  })
  if (expectedStatus === 200) waitForWebsocket()
}

export function waitForWebsocket() {
  cy.dataCy("connectedToWebsocket").should("have.text", "true")
}
