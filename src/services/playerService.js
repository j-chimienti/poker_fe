import { status } from "src/services/constants"

export function displayName({ name = "", position }) {
  const n = name
  if (n.toLowerCase().includes("session")) return `player ${position}`
  return n
}
