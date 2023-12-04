import { defineStore } from "pinia"
import { call, check, fold } from "src/services/apiService"

export const useUiStore = defineStore("ui", {
  state: () => ({
    invoiceModalVisible: false,
    debitModalVisible: false,
    loginModalVisible: false,
    accountModalVisible: false,
    raiseTheBetModalVisible: false,
    betModalVisible: false,
    foldModal: false,
    leaveModal: false,
    callTheBetModal: false,
    dontAskCall: false,
    dontAskFold: false,
    playAnotherHandModalVisible: false,
  }),
  actions: {
    onCall(tableId) {
      if (this.dontAskCall) return call(tableId)
      else this.callTheBetModal = true
    },
    onCheck(tableId) {
      check(tableId)
    },

    onFold(tableId) {
      if (this.dontAskFold) fold(tableId)
      else this.foldModal = true
    },
    onRaise() {
      this.raiseTheBetModalVisible = true
    },
    onBet() {
      this.betModalVisible = true
    },
  },
})
