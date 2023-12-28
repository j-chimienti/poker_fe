import { defineStore } from "pinia"
import * as apiService from "src/services/apiService"
import { call, check, fold } from "src/services/apiService"
import { usePokerStore } from "stores/poker-store"
import { Notify } from "quasar"

export const useUiStore = defineStore("ui", {
  state: () => ({
    loginModalVisible: false,
    accountModalVisible: false,
    raiseModal: false,
    betModal: false,
    foldModal: false,
    leaveModal: false,
    callModal: false,
    dontAskCall: false,
    dontAskFold: false,
    playAnotherHandModalVisible: false,
    dismissYourTurnNotification: null,
  }),
  actions: {
    openLoginModal() {
      return this.toggleModal("loginModalVisible", true)
    },
    toggleModal(modalName, value) {
      if (this[modalName] !== undefined) {
        this[modalName] = value
      }
    },
    onCall(tableId) {
      if (this.dontAskCall) return call(tableId)
      else this.toggleModal("callModal", true)
    },
    onCheck(tableId) {
      check(tableId)
    },

    onFold(tableId) {
      if (this.dontAskFold) fold(tableId)
      else this.foldModal = true
    },
    onRaise() {
      this.raiseModal = true
    },
    onBet() {
      this.betModal = true
    },
    sendBet(table, bet) {
      const betAmount = usePokerStore().canBet
      if (betAmount === null) {
        Notify.create({
          message: `Not allowed to bet`,
          type: "warning",
        })
        return
      } else if (bet < betAmount) {
        Notify.create({
          message: `Invalid bet amount. min is ${betAmount}`,
          type: "warning",
        })
        return
      }
      apiService.bet(table.id, bet)
      this.toggleModal("betModal", true)
    },
  },
})
