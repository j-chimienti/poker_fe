<template>
  <div>
    <q-dialog v-model="invoiceModalVisible">
      <q-card style="min-width: 200px" class="q-ma-md q-pa-md" dark>
        <div v-if="invoice !== null || invoiceIsExpired">
          <LightningInvoice />
        </div>
        <div v-else>
          <div class="text-h5">Generate a Lightning Invoice</div>
          <div class="q-pa-md">
            <div class="q-gutter-y-md" style="min-width: 350px">
              <CreateInvoice />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import LightningInvoice from "./LightningInvoice.vue"
import CreateInvoice from "./CreateInvoice.vue"
import StoreMixin from "../mixins/StoreMixin.vue"

export default {
  name: "InvoiceModal",
  mixins: [StoreMixin],
  components: { CreateInvoice, LightningInvoice },
}
</script>

<style lang="scss"></style>
