<template>
  <q-form @submit.prevent="handleWd" ref="lightningPaymentForm">
    <q-input
      :rules="[(val) => validateBolt11(val) || 'Invalid invoice']"
      v-model="form.bolt11"
      label-color="white"
      data-cy="bolt11Withdraw"
      placeholder-color="white"
      placeholder="Enter bolt11 <lnbc...>"
    >
      <template v-slot:append>
        <q-btn
          push
          dense
          color="orange"
          label="Withdraw"
          data-cy="bolt11WithdrawBtn"
          @click="handleWd"
        />
      </template>
    </q-input>
  </q-form>
</template>

<script>
// import invoiceParser from 'bolt11'
import DialogMixin from "../mixins/DialogMixin.vue"
import StoreMixin from "../mixins/StoreMixin.vue"

export default {
  name: "DebitForm",
  mixins: [StoreMixin, DialogMixin],
  data() {
    return {
      form: {
        bolt11: "",
      }
    }
  },
  computed: {
    validBolt11() {
      return this.validateBolt11(this.form.bolt11)
    },
  },
  methods: {
    validateBolt11(b) {
      const a = this.removeHrefFromPayReq(b)
      // todo: improve validation
      return a.startsWith("ln") && a.length > 10
    },
    removeHrefFromPayReq(bolt11) {
      return bolt11.toLowerCase().replace("lightning:", "").trim()
    },
    handleWd() {
      this.$refs.lightningPaymentForm.validate().then(success => {
        if (success) this.lightningPayment(this.removeHrefFromPayReq(this.form.bolt11))
      })
    },
  },
}
</script>

<style scoped></style>
