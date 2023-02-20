export const plead = "🥺"
export const slightlySad = "🙁"
export const pistol = "🔫"
export const disappointed = "😞"
export const frowningFaceOpenMouth = "😦"
export const anxious = "😰"
export const raisedHands = "🙌"

export function getEmoji(result, won) {
  if (result === "WIN") {
    return raisedHands
  } else if (result === "LOSS") {
    const WON = Math.abs(won)
    if (WON < 1000) return slightlySad
    else if (WON < 5000) return disappointed
    else if (WON < 10000) return frowningFaceOpenMouth
    else if (WON < 100000) return plead
    else if (WON < 1000000) return anxious
    else return pistol
  } else {
    return slightlySad
  }
}
