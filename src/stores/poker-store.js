import { defineStore } from "pinia"
import { useAuthStore } from "stores/auth-store"
import { flatten, get as _get, range, uniqBy } from "lodash"
import Card from "src/models/Card"
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
      let tableCards
      if (this.hand === t.hand) {
        if (t.cards.length === this.table.cards.length) {
          tableCards = this.table.cards
        } else {
          tableCards = this.table.cards.concat(
            cardsMapped.slice(this.table.cards.length)
          )
        }
      } else tableCards = cardsMapped
      const playerCards = Object.entries(t.pokerPlayers).map((res) => {
        const [playerId, p] = res
        const showCards = _get(p.player, "showCards", []).map(
          (c) => new Card(c)
        )
        const cards = p.player.cards.map((c) => new Card(c))
        const updatedPlayer = Object.assign({}, p.player, {
          showCards,
          cards,
        }) // cards: pc
        const updatedP = Object.assign({}, p, { player: updatedPlayer })
        return [playerId, updatedP]
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
      const { room } = this
      if (room === t.id)
        if (new Date(this.tableModified) <= new Date(t.modifiedAt))
          this.table = this.mapToTable(t)
        else console.log("skipping set older update")
      else
        console.log(
          `invalid set table, not in room. room=${room} table=${t.id}`
        )
    },
  },
  getters: {
    pot() {
      return _get(this.table, "pot", null)
    },
    tableId() {
      return _get(this.table, "id", null)
    },
    tableModified() {
      return _get(this.table, "modifiedAt", null)
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

    seats() {
      const maxSeat = _get(this.table, "config.players.max", 0)
      const start = 1
      const tablePositions = range(start, maxSeat + 1)
      return tablePositions.map((i) => {
        return (
          this.pokerPlayers
            .map((p) => p.player)
            .find((k) => k.position === i) || {
            position: i,
            cards: [],
            id: i,
            openSeat: true,
          }
        )
      })
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

    bigBlindPlayerOpt() {
      const bb = _get(this.table, "bigBlind", -1)
      return this.pokerPlayers.find((p) => p.player.position === bb)
    },
    smallBlindPlayerOpt() {
      const sb = _get(this.table, "smallBlind", -1)
      return this.pokerPlayers.find((p) => p.player.position === sb)
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
    nextHandStart() {
      return _get(this.table, "nextHandStart", null)
    },
    nextHandStartText() {
      const nhs = this.nextHandStart
      if (!nhs) return null
      else {
        const diff = Math.floor(
          (new Date(nhs).getTime() - new Date().getTime()) / 1000
        )
        if (diff <= 0) return null
        return diff
      }
    },
    playerOpt() {
      const playerId = useAuthStore().playerId
      if (!playerId) return null
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
