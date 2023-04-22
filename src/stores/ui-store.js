import { defineStore } from "pinia"
import { call, fold } from "src/services/apiService"

export const useUiStore = defineStore("ui", {
  state: () => ({
    invoiceModalVisible: false,
    debitModalVisible: false,
    loginModalVisible: false,
    accountModalVisible: false,
    raiseTheBetModalVisible: false,
    foldModal: false,
    leaveModal: false,
    callTheBetModal: false,
    checkModal: false,
    dontAskAgain: {
      call: true,
      check: false,
      fold: false,
    },
  }),
  actions: {
    onCall(tableId) {
      if (this.dontAskAgain.call) call(tableId)
      else this.callTheBetModal = true
    },
    // onCheck(tableId) {
    //   if (this.dontAskAgain.check) check(tableId)
    //   else this.checkModal = true
    // },

    onFold(tableId) {
      if (this.dontAskAgain.fold) fold(tableId)
      else this.foldModal = true
    },
  },
})
