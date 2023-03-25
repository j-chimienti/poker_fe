import { status } from "src/services/constants"

export function displayName(player) {
  const n = player.name
  if (n.includes("session")) return `player ${player.position}`
  return n
}

export function canPlaceBet(player) {
  return (
    player &&
    player.state &&
    ![status.FOLDED, status.SITTING, status.LEAVING].includes(player.state)
  )
}
