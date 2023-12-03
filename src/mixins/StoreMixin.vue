<script>
import { mapActions, mapState } from "pinia"
import DialogMixin from "./DialogMixin.vue"
import { useAuthStore } from "stores/auth-store"
import { useLightningStore } from "stores/lightning-store"
import { usePokerStore } from "stores/poker-store"

export default {
  name: "StoreMixin",
  mixins: [DialogMixin],

  methods: {
    lightningInvoice(satoshi) {
      return this.sendWebsocketMessage({
        WsLightningInvoiceRequest: null,
        satoshi,
      })
    },

    lightningPayment(bolt11) {
      return this.sendWebsocketMessage({
        WsBolt11DebitRequest: null,
        bolt11,
      })
    },
    ...mapActions(useAuthStore, [
      "login",
      "logout",
      "signup",
      "openWebsocket",
      "sendWebsocketMessage",
      "resumeSession",
    ]),
  },
  computed: {
    ...mapState(usePokerStore, ["room", "balance"]),
    ...mapState(useAuthStore, [
      "email",
      "connectedToWebsocket",
      "isSessionUser",
      "authenticated",
      "picture",
      "sessionId",
      "sessionUserNoBalance",
    ]),
    ...mapState(useLightningStore, [
      "btcusd",
      "invoiceIsExpired",
      "invoice_satoshi",
      "invoiceIsUnpaid",
      "invoiceExpiry",
      "invoice",
      "bolt11",
    ]),
  },
}
</script>

<style scoped></style>
