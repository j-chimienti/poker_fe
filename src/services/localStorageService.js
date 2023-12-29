import {LocalStorage} from "quasar"

const KEYS = {
  BLACKJACK_SESSION_ID: "BLACKJACK_SESSION_ID",
}

function setItem(key, value) {
  LocalStorage.set(key, value)
}

function getItem(key) {
  return LocalStorage.getItem(key)
}

export function saveSessionId(sessionId) {
  if (sessionId && typeof sessionId === "string" && sessionId.length)
    setItem(KEYS.BLACKJACK_SESSION_ID, sessionId)
  else console.error("skipping saving session id")
}

export function getSessionId() {
  const id = getItem(KEYS.BLACKJACK_SESSION_ID)
  if (id && typeof id === "string") return id
  else {
    console.error("did not load session id")
    return null
  }
}

export function clearSessionId() {
  LocalStorage.remove(KEYS.BLACKJACK_SESSION_ID)
}
