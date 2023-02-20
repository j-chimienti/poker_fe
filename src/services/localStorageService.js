import { LocalStorage } from "quasar"

const BTC_USD_KEY = "BTC_USD"
const BLACKJACK_SESSION_ID = "BLACKJACK_SESSION_ID"

export function saveBitcoinPrice(b) {
  return LocalStorage.set(BTC_USD_KEY, b)
}

export function getBitcoinPrice() {
  return LocalStorage.getItem(BTC_USD_KEY) || null
}

const LIGHTNING_INVOICE_KEY = "LIGHTNING_INVOICE"

export function saveInvoice(b) {
  return LocalStorage.set(LIGHTNING_INVOICE_KEY, b)
}

export function getInvoice() {
  return LocalStorage.getItem(LIGHTNING_INVOICE_KEY) || null
}


export function saveBet(b) {
  return LocalStorage.set("BET", Math.max(0, b))
}

export function loadBet() {
  return LocalStorage.getItem("BET")
}


export function saveSessionId(sessionId) {
  if (sessionId && typeof sessionId === "string" && sessionId.length)
    LocalStorage.set(BLACKJACK_SESSION_ID, sessionId)
  else console.error("skipping saving session id")
}

export function getSessionId() {
  const id = LocalStorage.getItem(BLACKJACK_SESSION_ID)
  if (id && typeof id === "string") return id
  else {
    console.error("did not load session id")
    return null
  }
}

export function clearSessionId() {
  console.log("clear session id")
  LocalStorage.remove(BLACKJACK_SESSION_ID)
}
