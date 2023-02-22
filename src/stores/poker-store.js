import {defineStore} from "pinia";
import {useAuthStore} from "stores/auth-store";
import {get as _get} from "lodash"
import Card from "src/models/Card";

const table_example = {
  "round": 0,
  "id": "8",
  "title": "table-8",
  "minPlayers": 4,
  "pot": 0,
  "pots": [],
  "private": false,
  "rake": 0,
  "state": "WAITING",
  "seed": 9999,
  "smallBlind": 0,
  "bigBlind": 0,
  "cards": [],
  "buyIn": 0,
  "maxPlayers": 8,
  "flopIndex": 0,
  "modifiedAt": "2023-02-21T14:07:14.816105Z",
  "newRoundRequest": false,
  "maxBet": 0,
  "pokerPlayers": {
    "1": {
      "player": {
        "playerAccountId": "AzVqWPSVA_JBAQ==",
        "position": 1,
        "tableId": "8",
        "state": "SITTING",
        "cards": [],
        "leaving": false,
        "allIn": false,
        "winner": false,
        "active": false,
        "profit": 0,
        "balance": 1000,
        "bet": 0,
        "talked": false,
        "autoFoldCount": 0,
        "chips": 0,
        "sb": false,
        "bb": false,
        "playerActorLastResponseTime": "2023-02-22T12:04:25.038297Z"
      },
      "actor": null
    },
    "2": {
      "player": {
        "playerAccountId": "ve5Xtb20QhFdyQ==",
        "position": 2,
        "tableId": "8",
        "state": "SITTING",
        "cards": [],
        "leaving": false,
        "allIn": false,
        "winner": false,
        "active": false,
        "profit": 0,
        "balance": 1000,
        "bet": 0,
        "talked": false,
        "autoFoldCount": 0,
        "chips": 0,
        "sb": false,
        "bb": false,
        "playerActorLastResponseTime": "2023-02-22T12:04:25.038298Z"
      },
      "actor": null
    },
    "3": {
      "player": {
        "playerAccountId": "T9Z_hlOKMPhLEQ==",
        "position": 3,
        "tableId": "8",
        "state": "SITTING",
        "cards": [],
        "leaving": false,
        "allIn": false,
        "winner": false,
        "active": false,
        "profit": 0,
        "balance": 1000,
        "bet": 0,
        "talked": false,
        "autoFoldCount": 0,
        "chips": 0,
        "sb": false,
        "bb": false,
        "playerActorLastResponseTime": "2023-02-22T12:04:25.038311Z"
      },
      "actor": null
    }
  }
}

Object.values(table_example.pokerPlayers)

export const usePokerStore = defineStore("poker", {
  actions: {
    setTable(t) {
      const cards = t.cards.map(c => new Card(c))
      const playerCards = Object.entries(t.pokerPlayers).map((res) => {
        const [idx, p]= res;
        const playerCards = p.player.cards.map(c => new Card(c))
        const updatedPlayer = Object.assign({}, p.player, {cards: playerCards})
        const updatedP =  Object.assign({}, p, {player: updatedPlayer})
        return [idx, updatedP]
      })
      const pokerPlayers = Object.fromEntries(playerCards)
      console.log(pokerPlayers)
      this.table = Object.assign({}, t, {cards, pokerPlayers})
      this.router.push({name: "table", params: {id: t.id}})
    }
  },
  getters: {
    myCards() {
      const playerOpt = this.joinedTable
      return _get(playerOpt, "cards", [])
    },
    pokerPlayers() { return _get(this.table, "pokerPlayers", {})},
    round() { return _get(this.table, "round", null)},
    cards() { return _get(this.table, "cards", [])},
    joinedTable() {
      const players = Object.values(this.pokerPlayers).map(p => p.player)
      return players.find(p => p.playerAccountId === useAuthStore().playerId)
    }
  },
  state: () => {
    return {
      tables: [],
      table: null

    }
  },

})
