<template>
    <q-form
      @submit="createInvoice"
      ref="createInvoiceForm"
      class="q-gutter-md"
      data-cy="createInvoiceForm"
    >
      <q-input
        label="satoshi"
        label-color="white"
        v-model.number="receive.data.amount"
        type="number"
        placeholder="Satoshi amount"
        lazy-rules
        :rules="[
          (val) => receive.minMax[0] < val || 'Too small',
          (val) => receive.minMax[1] > val || 'Too large',
        ]"
        autocomplete="off"
      >
        <template v-slot:append>
          <q-btn
            dense
            push
            data-cy="submitInvoiceBtn"
            color="orange"
            label="Invoice"
            type="submit"
            @click="createInvoice"
          />
        </template>
      </q-input>
    </q-form>
</template>

<script>
import StoreMixin from "../mixins/StoreMixin.vue"
import {INVOICE_FORM} from "src/constants";

export default {
  name: "CreateInvoice",
  mixins: [StoreMixin],
  data() {
    const amount = INVOICE_FORM.DEFAULT
    const receive = {
      unit: "satoshi",
      status: null,
      data: {
        amount,
      },
      minMax: [INVOICE_FORM.MIN, INVOICE_FORM.MAX],
    }
    return {
      receive,
    }
  },
  methods: {
    createInvoice() {
      this.$refs.createInvoiceForm
        .validate()
        .then((success) => {
          if (success) {
            this.lightningInvoice(this.receive.data.amount)
          }
        })
    },
  },
}
</script>

<style scoped></style>
