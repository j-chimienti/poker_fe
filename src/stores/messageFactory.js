import { Notify } from "quasar"
import { usePokerStore } from "stores/poker-store"

export async function messageFactory(res) {
  const {
    status = "failed",
    msg = null,
    tables = null,
    table = null,
    playerTurn = null,
    failedToJoinTable = null,
    gameResult = null,
    chatMessage = null,
  } = res

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
  if (playerTurn) {
    // playerId: String,
    //   playerName: String,
    //   canCall: Option[Int],
    //   canCheck: Boolean,
    //   canRaise: Option[Int],
    //   canBet: Option[Int],
    //   playerBalance: Int
    const {
      playerId,
      playerName,
      canCall,
      canCheck,
      canRaise,
      canBet,
      playerBalance,
    } = playerTurn
    // todo: set values
    if (playerId && pokerStore.playerIsMe(playerId))
      Notify.create({
        message: `your turn`,
        // timeout: timeoutSeconds * 1000,
        progress: true,
      })
  }
  if (tables) pokerStore.setTables(tables)
}
