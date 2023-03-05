import {Notify} from "quasar"
import {usePokerStore} from "stores/poker-store";

export async function messageFactory(res) {
  const {
    status = "failed",
    msg = null,
    // btcusd = null,
    // invoice = null,
    tables = null,
    table = null,
    placeBet = null,
    failedToJoinTable = null,
    gameResult = null
  } = res

  // const lightingStore = useLightningStore()
  const pokerStore = usePokerStore()

  if (msg) {
      Notify.create({
        type: status === "failed" ? "negative" : "info",
        message: msg,
      })
  }
  if (gameResult) {
    const {winner, hands, table} = gameResult
    //Notify.create("winner= " + winner)
    // Notify.create({
    //   message: hands.map(h => h.hand.message),
    //   timeout: 10000
    // })
    pokerStore.setTable(table)
  }
  if (table) pokerStore.setTable(table)
  if (failedToJoinTable) {
    const {table, message = ''} = failedToJoinTable
    Notify.create(message)
  }
  if (placeBet) {
    // todo: remove
  }
  //   const {timeoutSeconds, tableId} = placeBet
  //   Notify.create({
  //     message: `place bet in ${timeoutSeconds}s`,
  //     timeout: timeoutSeconds * 1000,
  //     progress: true
  //   })
  // }
  if (tables) pokerStore.setTables(tables)
  // if (btcusd) lightingStore.setBitcoinPrice(btcusd)
  // if (invoice) {
  //   lightingStore.setInvoice(invoice)
  //   if (invoice.status === LIGHTNING_INVOICES_STATUS.paid) {
  //     Notify.create({ type: "positive", message: "Invoice paid" })
  //     // bjStore.invoiceModalVisible = false
  //     // if (authStore.isSessionUser) {
  //     //   bjStore.bet = 100
  //     // }
  //   } else if (invoice.status === LIGHTNING_INVOICES_STATUS.expired) {
  //     Notify.create({ message: "Invoice expired" })
  //   }
  // }
}
