import { defineStore } from "pinia"
import { useAuthStore } from "stores/auth-store"
import { flatten, get as _get, uniqBy } from "lodash"
import Card from "src/models/Card"
import { openSeats } from "src/services/tableService"
import { formatToUSD } from "src/services/moneyUtils"
import { pages } from "src/constants"

export const usePokerStore = defineStore("poker", {
  actions: {
    onChatMessage(m) {
      {
        if (!this.chatMessages.hasOwnProperty(m.tableId))
          Object.assign(this.chatMessages, { [m.tableId]: [m] })
        else
          Object.assign(this.chatMessages, {
            [m.tableId]: this.chatMessages[m.tableId].concat(m).slice(-100),
          })
      }
    },
    openChat() {
      this.chatVisible = !this.chatVisible
    },
    mapToTable(t) {
      const cardsMapped = t.cards.map((c) => new Card(c))
      const tableHand = _get(this.table, "hand", -1)
      let tableCards
      if (tableHand === t.hand) {
        if (t.cards.length === this.table.cards.length) {
          tableCards = this.table.cards
        } else {
          tableCards = this.table.cards.concat(
            cardsMapped.slice(this.table.cards.length)
          )
        }
      } else tableCards = cardsMapped
      const playerCards = Object.entries(t.pokerPlayers).map((res) => {
        const [idx, p] = res
        const playerId = useAuthStore().playerId
        const stateCards = _get(
          this.table,
          `pokerPlayers.${idx}.player.cards`,
          []
        )
        const playerCardsMapped = p.player.cards.map((c) => new Card(c))
        const bestCards = _get(p.player, "showCards", []).map(
          (c) => new Card(c)
        )
        let pc
        if (p.player.playerAccountId === playerId) {
          if (
            tableHand === t.hand &&
            stateCards.length > 0 &&
            playerCardsMapped.length === stateCards.length
          ) {
            pc = stateCards
          } else {
            pc = playerCardsMapped
          }
        } else pc = p.player.cards

        const updatedPlayer = Object.assign({}, p.player, {
          bestCards,
          cards: pc,
        }) // cards: pc
        const updatedP = Object.assign({}, p, { player: updatedPlayer })
        return [idx, updatedP]
      })
      const pokerPlayers = Object.fromEntries(playerCards)
      return Object.assign({}, t, { cards: tableCards, pokerPlayers })
    },
    setTables(tables) {
      this.tables = tables
      tables.map((table) =>
        table.id === this.room ? this.setTable(table) : null
      )
    },
    setTable(t) {
      if (this.room === t.id) {
        if (
          this.table &&
          this.table.modifiedAt &&
          new Date(this.table.modifiedAt) > new Date(t.modifiedAt)
        ) {
          console.log("skipping set older update")
        } else this.table = this.mapToTable(t)
      }
    },
  },
  getters: {
    callAmount() {
      return _get(this.table, "callAmount", -1)
    },
    raiseAmount() {
      return _get(this.table, "playerTurn.canRaise", null)
    },
    tableId() {
      return _get(this.table, "id", null)
    },
    balance() {
      return formatToUSD(_get(this.playerOpt, "balance", 0), 2)
    },
    maxBet() {
      const bets = this.pokerPlayers
        .map((p) => p.player.bet)
        .sort((a, b) => b - a)
      return bets[0] || 0
    },
    allPlayers() {
      return uniqBy(
        flatten(
          this.tables.map((table) =>
            Object.values(table.pokerPlayers).map((p) => p.player)
          )
        ),
        "playerAccountId"
      )
    },
    pokerPlayersByPosition() {
      return this.pokerPlayers
        .map((p) => p.player)
        .sort((a, b) => a.position - b.position)
    },
    tablePositions() {
      return openSeats(this.table)
    },
    hand() {
      return _get(this.table, "hand", -1)
    },
    myTurn() {
      return useAuthStore().playerId === this.playerTurnId
    },
    playerTurn() {
      return _get(this.table, "playerTurn", null)
    },
    playerTurnId() {
      return _get(this.playerTurn, "playerId", null)
    },
    myCards() {
      return _get(this.playerOpt, "cards", [])
    },
    bestCards() {
      return _get(this.playerOpt, "bestCards", [])
    },

    bigBlindPlayerOpt() {
      var bb = _get(this.table, "bigBlind", -1)
      return this.pokerPlayers.find((p) => p.player.position === bb)
    },
    smallBlindPlayerOpt() {
      var bb = _get(this.table, "smallBlind", -1)
      return this.pokerPlayers.find((p) => p.player.position === bb)
    },

    pokerPlayers() {
      return Object.values(_get(this.table, "pokerPlayers", {}))
    },
    round() {
      return _get(this.table, "round", null)
    },
    cards() {
      return _get(this.table, "cards", [])
    },
    joinedTable() {
      return Boolean(this.playerOpt)
    },
    playerOpt() {
      const playerId = useAuthStore().playerId
      return _get(this.table, `pokerPlayers.${playerId}.player`, null)
    },

    playerIsMe: (state) => (playerId) => {
      return playerId === useAuthStore().playerId
    },
    // returns amount needed to call
    canCall() {
      return _get(this.table, "playerTurn.canCall", null)
    },
    canBet() {
      return _get(this.table, "playerTurn.canBet", null)
    },
    canCheck() {
      return _get(this.table, "playerTurn.canCheck", null)
    },
    canRaise() {
      return _get(this.table, "playerTurn.canRaise", null)
    },
  },
  state: () => {
    return {
      tables: [],
      table: null,
      chatMessages: {},
      chatVisible: false,
      room: pages.lobby,
    }
  },
})
