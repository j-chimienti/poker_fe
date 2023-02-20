<template>
  <div hidden data-cy="invoice">{{ invoice }}</div>
  <div hidden data-cy="invoiceIsUnpaid">{{ invoiceIsUnpaid }}</div>
  <div hidden data-cy="bolt11">{{ bolt11 }}</div>
  <div hidden data-cy="gameState">{{ gameState }}</div>
  <div hidden data-cy="playingFor">{{ playingFor }}</div>
  <div hidden data-cy="isBust">{{ isBust }}</div>
  <div hidden data-cy="isBlackJack">{{ isBlackJack }}</div>
  <div hidden data-cy="bet">{{ bet }}</div>
  <div hidden data-cy="softTotal">{{ softTotal }}</div>
  <div hidden data-cy="hardTotal">{{ hardTotal }}</div>
  <div hidden data-cy="nCards">{{ nCards }}</div>
  <div hidden v-if="connectedToWebsocket" data-cy="connectedToWebsocket">
    {{ connectedToWebsocket }}
  </div>
  <div hidden data-cy="balance">{{ balance }}</div>
  <div hidden data-cy="email">{{ email }}</div>
  <div hidden data-cy="hand">{{ hand }}</div>
</template>
<script>
import StoreMixin from "src/mixins/StoreMixin.vue";

export default {
  name: 'TestData',
  mixins: [StoreMixin]
}
</script>
