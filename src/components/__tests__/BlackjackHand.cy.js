import Card from "src/models/Card"

import BlackjackHand from "components/PokerHand.vue"

describe("BlackjackHand", () => {
  it("renders hand", () => {
    cy.mount(BlackjackHand, {
      props: {
        componentProps: {
          hand: {
            cards: [
              new Card({ value: 10, suite: "diamond", face: "Jack" }),
              new Card({ value: 10, suite: "spade", face: "Queen" }),
              new Card({ value: 10, suite: "club", face: "King" }),
            ],
          },
        },
      },
    })
    assert(true)
  })
})
