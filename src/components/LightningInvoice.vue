<template>
  <div style="min-width: 400px">
    <div class="row justify-around q-my-sm">
      <div>
        {{ invoice_satoshi }} satoshi
        <!--        <span-->
        <!--          >${{ invoiceCostUSD.toLocaleString() }}</span-->
        <!--        >-->
      </div>
      <div>
        <q-icon name="timer" />
        {{ timeRemaining }}
      </div>
    </div>
    <div class="row justify-start">
      <a :href="href">
        <vue-qr
          :text="invoice.bolt11"
          :size="200"
          colorDark="black"
        ></vue-qr>
      </a>
    </div>
    <div class="row justify-start q-my-md">
      <q-btn
        color="primary"
        :href="href"
        round
        icon="share"
        type="a"
        class="q-mr-lg"
      />
      <q-btn
        type="a"
        color="primary"
        icon="content_copy"
        round
        @click="copyPaymentRequest"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import { copyToClipboard } from "quasar"
import StoreMixin from "src/mixins/StoreMixin.vue"

const copyText = "copy"
export default {
  name: "LightningInvoice",
  mounted() {
    setInterval(() => {
      this.timeLeft = ((this.invoiceExpiry - Date.now()) / 1000) | 0
      this.timeRemaining = this.formatDur(this.timeLeft)
    }, 1000)
  },
  mixins: [StoreMixin],
  methods: {
    copyPaymentRequest() {
      copyToClipboard(this.invoice.bolt11)
      this.$q.notify("copied")
    },

    formatDur(x) {
      const h = (x / 3600) | 0
      const m = ((x % 3600) / 60) | 0
      const s = x % 60
      return `${h > 0 ? `${h}:` : ""}${m < 10 && h > 0 ? "0" : ""}${m}:${
        s < 10 ? "0" : ""
      }${s}`
    },
  },

  computed: {
    href() {
      return `lightning:${this.invoice.bolt11}`
    },
  },
  data() {
    return {
      timeRemaining: 0,
      timeLeft: 0,
      updateDurationInterval: null,
      copyBtnLabel: "copy",
      copyText,
    }
  },
}
</script>

<style scoped></style>
