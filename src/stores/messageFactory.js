import { Notify } from "quasar"
import { usePokerStore } from "stores/poker-store"

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
    gameResult = null,
    chatMessage = null,
  } = res

  // const lightingStore = useLightningStore()
  const pokerStore = usePokerStore()

  if (chatMessage) pokerStore.onChatMessage(chatMessage)

  if (msg && typeof msg === "string") {
    Notify.create({
      type: status === "failed" ? "negative" : "info",
      message: msg,
    })
  }
  if (gameResult) {
    const { winner, hands, table, message } = gameResult
    Notify.create(message)
    pokerStore.setTable(table)
  }
  if (table) pokerStore.setTable(table)
  if (failedToJoinTable) {
    const { table, message = "" } = failedToJoinTable
    Notify.create(message)
  }
  if (placeBet) {
    // const { callAmount, tableId, betBy, canCall, canCheck } = placeBet
    // pokerStore.onYourBet(placeBet)
    // todo: set values
  }
  //   const {timeoutSeconds, tableId} = placeBet
  //   Notify.create({
  //     message: `place bet in ${timeoutSeconds}s`,
  //     timeout: timeoutSeconds * 1000,
  //     progress: true
  //   })
  // }
  if (tables) pokerStore.setTables(tables)
}
