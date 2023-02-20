const users = Cypress.env("users")
export const TEST_USER_WITH_BALANCE = users.find(
  (u) => u.type === "TEST_USER_WITH_BALANCE"
)
export const TEST_USER_ZERO_BALANCE = users.find(
  (u) => u.type === "TEST_USER_ZERO_BALANCE"
)
