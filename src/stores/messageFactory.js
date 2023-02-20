import {GAME_STATES, LIGHTNING_INVOICES_STATUS} from "src/constants"
import {Notify} from "quasar"
import {useBlackjackStore} from "stores/blackjack-store"
import {useLightningStore} from "stores/lightning-store"
import {useAuthStore} from "stores/auth-store"
import {get as _get} from 'lodash'

export async function messageFactory(res) {
  const {
    status = "failed",
    msg = null,
    btcusd = null,
    debit = null,
    statement = null,
    paymentError = null,
    dealOne = null, // Card
    newGame = null,
    bet = null,
    gameResult = null,
    invoice = null,
    latestBet = null,
    placeBet = null,
    addPlayerSuccess = null,
    yourTurn = null,
    moveRequest = null
  } = res

  const bjStore = useBlackjackStore()
  const lightingStore = useLightningStore()
  const authStore = useAuthStore()

  if (msg) {
    if (msg.startsWith("DealerConfig")) {
      // console.log(msg)
    } else if (msg.toLowerCase().startsWith("added to table")) {
    } else
      Notify.create({
        type: status === "failed" ? "negative" : "info",
        message: msg,
      })
  }
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
  if (debit) {
    const { status = "", label = "" } = debit
    Notify.create({
      type: status === "complete" ? "positive" : "negative",
      message: `payment ${status} label=${label}`
    })
  }
  if (latestBet) bjStore.latestBet = latestBet
  if (placeBet) bjStore.gameState = GAME_STATES.bet
  if (addPlayerSuccess) bjStore.table = 1
  // todo: receive {"status":"success","yourTurn":true} shortly after gameResult need to wait until we display to user
  if (yourTurn) bjStore.gameState = GAME_STATES.move
  if (dealOne) bjStore.dealOne(dealOne)
  if (newGame) {
    const { hand, faceUp } = newGame
    bjStore.setNewGame(hand, faceUp)
  }
  if (bet) bjStore.bet = bet

  // {"status":"success","gameResult":{"result":"LOSS","satoshi":0,"playerHand":{"cards":[{"value":2,"suite":"spade","face":null},{"value":9,"suite":"club","face":null}]},"dealerHand":{"cards":[{"value":8,"suite":"diamond","face":null},{"value":1,"suite":"heart","face":"Ace"}]},"playerTotal":11,"dealerTotal":19,"createdAt":"2023-01-04T22:23:58.060949Z"}}
  if (gameResult) bjStore.onGameResult(gameResult)

  if (paymentError)
    Notify.create({
      type: "negative",
      message: _get(paymentError, 'paymentError',  "Error"),
    })
  if (statement) bjStore.onStatement(statement)
}
