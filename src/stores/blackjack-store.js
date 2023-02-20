// import example from './module-example'

import {get as _get} from "lodash"

import {BET, GAME_STATES, GameResults, PLAYING_FOR} from "../services/constants"
import Card, {FaceDownCard} from "../models/Card"
import {getEmoji} from "../services/emojiService"
import {defineStore} from "pinia"
import {Hand} from "src/models/Hand";
import {loadBet, saveBet} from "src/services/localStorageService";
import {createNotification} from "src/services/notificationService";

export const useBlackjackStore = defineStore("blackjack", {
  actions: {
    setBet(bet) {
      this.bet = bet
      saveBet(bet)
    },
    playingForFree() {
      this.playingFor = PLAYING_FOR.FREE
    },
    dealOne(card) {
      this.hand.cards.push(new Card(card))
    },
    async setNewGame(hand, faceUp) {
      this.gameState = GAME_STATES.dealing
      const HAND = new Hand(hand)
      this.hand = HAND
      this.dealerCards = [FaceDownCard(), Card(faceUp)]
      if (!HAND.isBlackJack) this.gameState = GAME_STATES.move
    },
    onStatement(statement) {
      if (this.balance === 0 && statement.balance > 0){
        this.bet = Math.max(BET.MIN, this.bet)
        this.playingFor = PLAYING_FOR.BTC
      }
      const gameStats = statement.gameStats.map((stats) => {
        const playerHand = {
          cards: stats.playerHand.cards.map((c) => new Card(c)),
        }
        const dealerHand = {
          cards: stats.dealerHand.cards.map((c) => new Card(c)),
        }
        return {
          ...stats,
          playerHand,
          dealerHand,
        }
      })
      this.statement = Object.assign({}, statement, { gameStats })
    },

    clearInvoice() {
      this.invoice = null
    },

    async onGameResult(gameResult) {
      this.gameState = GAME_STATES.bet
      const {
        dealerHand,
        result, //GameResults
        satoshi,
        playerHand,
        dealerTotal,
        playerTotal,
      } = gameResult

      const DEALER_HAND = new Hand(dealerHand)
      const PLAYER_HAND = new Hand(playerHand)
      const dealerCards = DEALER_HAND.cards
      const prevDealerCardsLength = this.dealerCards.length
      const notificationDelay = (dealerCards.length - prevDealerCardsLength) * 900
      this.dealerCards = this.dealerCards.map((card, i) => {
        // face down is first card, so update the info, keep id
        if (i === 0) return Object.assign(i, { ...dealerCards[0], id: card.id })
        else return card
      })
      for (let card of dealerCards.slice(2)) this.dealerCards.push(card)
      const won = result === GameResults.WIN
      const lost = result === GameResults.LOSS
      const tie = result === GameResults.TIE
      const isBlackJack = PLAYER_HAND.isBlackJack
      const totalText = tie
        ? `${playerTotal}s`
        : `${playerTotal} v ${dealerTotal}`
      const emoji = getEmoji(result, satoshi)
      const msg = isBlackJack
        ? `🎉 Blackjack! 🎉 ${satoshi}`
        : `${emoji} ${result} ${totalText}`
      const color =  won ? "green" : lost ? "red" : null

      setTimeout(() => {
        createNotification({
          timeout: 3,
          message: msg,
          caption: won ? `won ${satoshi}` : null,
          color,
          position: "left",
        })
      }, notificationDelay)
    },
  },
  state: () => {
    return {
      playingFor: PLAYING_FOR.BTC,
      bet: loadBet() || 100, // satoshi
      gameState: GAME_STATES.bet,
      statement: null,
      hand: null, // Hand
      dealerCards: []
    }
  },
  getters: {
    balance: state => _get(state.statement, "balance", 0),
    gameStats: (state) => _get(state.statement, "gameStats", []),
    isPlayingForFree: (state) => state.playingFor === PLAYING_FOR.FREE,
    isBetting: (state) => state.gameState === GAME_STATES.bet,
    isScoring: (state) => state.gameState === GAME_STATES.scoring,
    isDealing: (state) => state.gameState === GAME_STATES.dealing,
    isBust: state => _get(state.hand, "isBust", null),
    isBlackJack: state => _get(state.hand, "isBlackJack", null),
    softTotal: state => _get(state.hand, "softTotal", null),
    hardTotal: state => _get(state.hand, "hardTotal", null),
    cards: state => _get(state.hand, 'cards', []),
    nCards: state => state.cards.length,
    buttonsDisabled: state => state.isBust || state.isScoring || state.isDealing
  },
})
