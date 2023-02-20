import {defineStore} from "pinia";

export const useUiStore = defineStore("ui", {
  state: () => ({
    invoiceModalVisible: false,
    debitModalVisible: false,
    rightDrawerOpen: false,
    loginModalVisible: false,
  })
})
