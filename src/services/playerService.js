export function playerName(player) {
  if (!(player && player.name)) return ""
  const isAnon = player.name.includes("session")
  return isAnon ? "anon" : player.name
}
