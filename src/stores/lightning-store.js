import {defineStore} from "pinia"
import {get} from "lodash"
import {getBitcoinPrice, saveBitcoinPrice, saveInvoice,} from "src/services/localStorageService"

export const useLightningStore = defineStore("lightning", {
  getters: {
    invoiceIsExpired: (state) => get(state.invoice, "status", "") === "expired",
    invoice_satoshi: (state) => get(state.invoice, "amount_msat", 0) / 1000,
    invoiceIsUnpaid: (state) => get(state.invoice, "status", "") === "unpaid",
    invoiceExpiry: (state) =>
      new Date(get(state.invoice, "expires_at", 0) * 1000),
    bolt11: state => get(state.invoice, "bolt11", null)
  },
  actions: {
    setBitcoinPrice(b) {
      this.btcusd = b
      saveBitcoinPrice(b)
    },
    setInvoice(i) {
      const inv = i.status === "paid" || i.status === "expired" ? null : i
      saveInvoice(inv)
      this.invoice = inv
    },
  },
  state: () => ({
    invoice: null, // getInvoice() todod need to get invoice
    btcusd: getBitcoinPrice(),
  }),
})
