import { defineStore } from "pinia"

export const useUiStore = defineStore("ui", {
  state: () => ({
    invoiceModalVisible: false,
    debitModalVisible: false,
    loginModalVisible: false,
    accountModalVisible: false,
  }),
})
