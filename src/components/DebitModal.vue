<template>
  <q-dialog v-model="debitModalVisible">
    <q-card class="q-pa-md debit text-white" dark>
      <DebitForm />
      <QrCodeReader />
    </q-card>
  </q-dialog>
</template>

<script>
// import invoiceParser from 'bolt11'
import QrCodeReader from "./QrCodeReader.vue"
import DialogMixin from "../mixins/DialogMixin.vue"
import DebitForm from "./DebitForm.vue"

export default {
  name: "DebitModal",
  components: { DebitForm, QrCodeReader },
  mixins: [DialogMixin],
}
</script>

<style scoped></style>
