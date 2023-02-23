import {GAME_STATES, LIGHTNING_INVOICES_STATUS} from "src/services/constants"
import {Notify} from "quasar"
import {useBlackjackStore} from "stores/blackjack-store"
import {useLightningStore} from "stores/lightning-store"
import {useAuthStore} from "stores/auth-store"
import {usePokerStore} from "stores/poker-store";

export async function messageFactory(res) {
  const {
    status = "failed",
    msg = null,
    btcusd = null,
    statement = null,
    bet = null,
    invoice = null,
    yourTurn = null,
    tables = null,
    table = null,
    placeBet = null,
    failedToJoinTable = null
  } = res

  const bjStore = useBlackjackStore()
  const lightingStore = useLightningStore()
  const authStore = useAuthStore()
  const pokerStore = usePokerStore()

  if (msg) {
      Notify.create({
        type: status === "failed" ? "negative" : "info",
        message: msg,
      })
  }
  if (table) {
    pokerStore.setTable(table)
  }
  if (failedToJoinTable) {
    const {table, message = ''} = failedToJoinTable
    Notify.create(message)
  }
  if (placeBet) {
    const {timeoutSeconds, tableId} = placeBet
    bjStore.gameState = GAME_STATES.bet
    Notify.create({
      message: `place bet in ${timeoutSeconds}s`,
      timeout: timeoutSeconds * 1000,
      progress: true
    })
  }
  if (tables) pokerStore.tables = tables
  if (btcusd) lightingStore.setBitcoinPrice(btcusd)
  if (invoice) {
    lightingStore.setInvoice(invoice)
    if (invoice.status === LIGHTNING_INVOICES_STATUS.paid) {
      Notify.create({ type: "positive", message: "Invoice paid" })
      bjStore.invoiceModalVisible = false
      if (authStore.isSessionUser) {
        bjStore.bet = 100
      }
    } else if (invoice.status === LIGHTNING_INVOICES_STATUS.expired) {
      Notify.create({ message: "Invoice expired" })
    }
  }
  // todo: receive {"status":"success","yourTurn":true} shortly after gameResult need to wait until we display to user
  if (yourTurn) bjStore.gameState = GAME_STATES.move
  if (bet) bjStore.bet = bet
  if (statement) bjStore.onStatement(statement)
}
