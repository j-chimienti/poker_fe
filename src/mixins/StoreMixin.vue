<script>
import {mapActions, mapState} from "pinia"
import {BLACKJACK_DECISIONS, GAME_STATES} from "../constants.js"
import DialogMixin from "./DialogMixin.vue"
import {useAuthStore} from "stores/auth-store"
import {useBlackjackStore} from "stores/blackjack-store"
import {useLightningStore} from "stores/lightning-store"
import {BET} from "../constants"
export default {
  name: "StoreMixin",
  mixins: [DialogMixin],
  data() {
    return { GAME_STATES, BET }
  },
  methods: {

    join() {
      return this.sendWebsocketMessage({
        type: "JOIN",
        tableId: "1",
        position: 1
      })
    },
    move(m) {
      return this.sendWebsocketMessage({
        WsBlackjackMove: null,
        move: m,
      })
    },

    betRequest() {
      const { bet, balance,  isPlayingForFree } = this
      if (isPlayingForFree)
        this.sendWebsocketMessage({ WsBetRequest: null, satoshi: 0 })
      else if (bet < BET.MIN)
        this.$q.notify({
          message: "Invalid bet=" + bet,
          type: "warning",
          position: "left"
        })
        else if (bet > BET.MAX) this.$q.notify({
        message: "Invalid bet=" + bet,
        type: "warning",
        position: "left"
      })
      else if (balance < bet) {
        useBlackjackStore().invoiceModalVisible =true
      } else this.sendWebsocketMessage({ WsBetRequest: null, satoshi: bet })
    },

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
    ...mapActions(useBlackjackStore, [
      "clearGame",
    ]),

    hit() {
      this.move(BLACKJACK_DECISIONS.HIT)
    },

    stand() {
      this.move(BLACKJACK_DECISIONS.STAND)
    },
  },
  computed: {
    playingFor: {
      get() { return useBlackjackStore().playingFor },
      set(v) {
        useBlackjackStore().playingFor = v
      }
    },
    bet: {
      get() { return useBlackjackStore().bet },
      set(v) {
        useBlackjackStore().setBet(v)
      }
    },
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
      "bolt11"
    ]),
    ...mapState(useBlackjackStore, [
      "table",
      "isPlayingForFree",
      "buttonsDisabled",
      "isBetting",
      "dealerCards",
      "hand",
      "balance",
      "gameState",
      "cards",
      "isBust",
      "isBlackJack",
      "softTotal",
      "hardTotal",
      "nCards",
    ]),

  },
}
</script>

<style scoped></style>
