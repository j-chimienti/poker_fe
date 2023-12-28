import { defineStore } from "pinia"
import { useAuthStore } from "stores/auth-store"
import { flatten, get as _get, range, uniqBy } from "lodash"
import Card from "src/models/Card"
import { pages } from "src/constants"

const HAND_NOT_STARTED = -1
const BIG_BLIND_MULTIPLIER = 2
const MAX_CHAT_MESSAGES = 100

export const usePokerStore = defineStore("poker", {
  actions: {
    onChatMessage(m) {
      if (!this.chatMessages.hasOwnProperty(m.tableId))
        this.chatMessages[m.tableId] = [m]
      else {
        if (this.chatMessages[m.tableId].length >= MAX_CHAT_MESSAGES) {
          this.chatMessages[m.tableId] = this.chatMessages[m.tableId]
            .slice(-MAX_CHAT_MESSAGES + 1)
            .concat(m)
        } else {
          this.chatMessages[m.tableId].push(m)
        }
      }
    },

    openChat() {
      this.chatVisible = !this.chatVisible
    },
    mapToTable(t) {
      // Helper function to map cards
      const mapCards = (cards) => cards.map((c) => new Card(c))

      // Update table cards
      let newTableCards = mapCards(t.cards)
      let currentTable = this.table
      let tableCards =
        currentTable && t.hand === this.hand
          ? JSON.stringify(newTableCards) !== JSON.stringify(currentTable.cards)
            ? newTableCards
            : currentTable.cards
          : newTableCards

      // Update player cards
      const pokerPlayers = Object.fromEntries(
        Object.entries(t.pokerPlayers).map(([playerId, p]) => {
          const currentCards = _get(
            currentTable,
            `pokerPlayers.${playerId}.player.cards`,
            []
          )
          const newCards = mapCards(p.player.cards)
          const showCards = mapCards(_get(p.player, "showCards", []))
          const bestPoint = mapCards(_get(p.player, "bestPoint.cards", []))
          const cards =
            JSON.stringify(currentCards) !== JSON.stringify(newCards)
              ? newCards
              : currentCards

          const updatedPlayer = {
            ...p.player,
            showCards,
            cards,
            bestPoint: { ...p.player.bestPoint, cards: bestPoint },
          }

          return [playerId, { ...p, player: updatedPlayer }]
        })
      )

      // Return the updated table
      return { ...t, cards: tableCards, pokerPlayers }
    },
    setTables(tables) {
      this.tables = tables
      tables.forEach((table) =>
        table.id === this.room ? this.setTable(table) : null
      )
    },
    setTable(t) {
      if (this.room !== t.id) return
      if (new Date(this.tableModified) <= new Date(t.modifiedAt))
        this.table = this.mapToTable(t)
    },
  },
  getters: {
    nextHandStartText() {
      const nhs = this.nextHandStart
      if (!nhs) return null
      const diff = Math.floor(
        (new Date(nhs).getTime() - new Date().getTime()) / 1000
      )
      return diff > 0 ? diff : null
    },

    pot() {
      return this.table?.pot ?? 0
    },
    tableId() {
      return this.table?.id ?? null
    },
    tableModified() {
      return this.table?.modifiedAt ?? null
    },
    balance() {
      return this.playerOpt?.balance ?? 0
    },
    maxBet() {
      return this.table?.maxBetOrRaise ?? 0
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
    maxPlayers() {
      return this.table?.config.players.max ?? 0
    },
    smallBlindBetAmount() {
      return this.table?.config.bet.min ?? 0
    },
    bigBlindBetAmount() {
      return this.smallBlindBetAmount * BIG_BLIND_MULTIPLIER
    },
    seats() {
      const start = 1
      const tablePositions = range(start, this.maxPlayers + 1)
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
      return this.table?.hand ?? HAND_NOT_STARTED
    },
    myTurn() {
      return useAuthStore().playerId === this.playerTurnId
    },
    playerTurn() {
      return this.table?.playerTurn ?? null
    },
    playerTurnId() {
      return this.playerTurn?.playerId ?? null
    },
    myCards() {
      return this.playerOpt?.cards ?? []
    },
    bigBlindPlayerOpt() {
      const bb = this.table?.bigBlind ?? -1
      return this.pokerPlayers.find((p) => p.player.position === bb)
    },
    smallBlindPlayerOpt() {
      const sb = this.table?.smallBlind ?? -1
      return this.pokerPlayers.find((p) => p.player.position === sb)
    },
    pokerPlayers() {
      return Object.values(this.table?.pokerPlayers || {})
    },
    round() {
      return this.table?.round || null
    },
    cards() {
      return this.table?.cards || []
    },
    joinedTable() {
      return Boolean(this.playerOpt)
    },
    nextHandStart() {
      const nhs = this.table?.nextHandStart
      if (!nhs) return null
      const diff = Math.floor(
        (new Date(nhs).getTime() - new Date().getTime()) / 1000
      )
      return diff > 0 ? diff : null
    },
    playerOpt() {
      const playerId = useAuthStore().playerId
      return playerId ? this.table?.pokerPlayers?.[playerId]?.player : null
    },
    playerIsMe: (state) => (playerId) => {
      return playerId === useAuthStore().playerId
    },
    canCall() {
      return this.table?.playerTurn?.canCall ?? null
    },
    canBet() {
      return this.table?.playerTurn?.canBet ?? null
    },
    canCheck() {
      return this.table?.playerTurn?.canCheck ?? null
    },
    canRaise() {
      return this.table?.playerTurn?.canRaise ?? null
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
