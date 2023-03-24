export function displayName(player) {
  const n = player.name
  if (n.includes("session")) return `player ${player.position}`
  return n
}
