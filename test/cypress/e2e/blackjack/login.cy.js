import { handleErrors } from "./handleErrors"
import { withBalance, noBalance, login } from "./login"

handleErrors()

describe("login", () => {
  const un = noBalance.username
  const pw = noBalance.password

  it(`can login with user ${un}`, () => {
    login(un, pw, 200)
    cy.dataCy("balance").should("have.text", 0)
    cy.dataCy("gameState").should("have.text", "bet")
  })

  it("fails to login with wrong password", () => {
    login(un, `${pw}who`, 404)
    cy.contains("Login failed")
  })

  it("login with uppercase username", () => {
    login(un.toUpperCase(), pw, 200)
    cy.dataCy("balance").should("have.text", 0)
    cy.dataCy("gameState").should("have.text", "bet")
  })
  it("login with extra space in username", () => {
    login(` ${un} `, pw, 200)
    cy.dataCy("balance").should("have.text", 0)
    cy.dataCy("gameState").should("have.text", "bet")
  })

  it(`login with ${withBalance.username} balance=${withBalance.balance}`, () => {
    const { username, password, balance } = withBalance
    login(username, password, 200)
    cy.dataCy("balance").should("have.text", balance)
    cy.dataCy("gameState").should("have.text", "bet")
    cy.dataCy("bet").should("have.text", 100)
  })
})
