import { range } from "lodash"

export function openSeats(table) {
  const maxSeat = table.config.players.max
  const start = 1
  const tablePositions = range(start, maxSeat + 1)
  return tablePositions.map((i) => {
    return (
      Object.values(table.pokerPlayers)
        .map((p) => p.player)
        .find((k) => k.position === i) || i
    )
  })
}
