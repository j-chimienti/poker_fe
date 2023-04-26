import { status } from "src/services/constants"

export function displayName({ name = "", position }) {
  const n = name
  if (n.toLowerCase().includes("session")) return `player ${position}`
  return n
}

export function canPlaceBet(player) {
  return (
    player &&
    player.state &&
    ![status.FOLDED, status.SITTING, status.LEAVING].includes(player.state)
  )
}
