<template>
  <div hidden data-cy="invoice">{{ invoice }}</div>
  <div hidden data-cy="invoiceIsUnpaid">{{ invoiceIsUnpaid }}</div>
  <div hidden data-cy="bolt11">{{ bolt11 }}</div>
  <div hidden v-if="connectedToWebsocket" data-cy="connectedToWebsocket">
    {{ connectedToWebsocket }}
  </div>
  <div hidden data-cy="email">{{ email }}</div>
</template>
<script>
import StoreMixin from "src/mixins/StoreMixin.vue";

export default {
  name: 'TestData',
  mixins: [StoreMixin]
}
</script>
