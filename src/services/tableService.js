import { range } from "lodash"
import Card from "src/models/Card"

export function openSeats(table) {
  const maxSeat = table.config.players.max
  const start = 1
  const tablePositions = range(start, maxSeat + 1)
  return tablePositions
    .map((i) => {
      return (
        Object.values(table.pokerPlayers)
          .map((p) => p.player)
          .find((k) => k.position === i) || {
          position: i,
          cards: [],
          id: i,
          openSeat: true,
        }
      )
    })
    .map((p) => ({ ...p, cards: p.cards.map((c) => new Card(c)) }))
}
