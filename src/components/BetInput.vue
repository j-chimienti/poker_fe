<template>
  <q-input
      v-if="!isPlayingForFree"
      class="q-ml-md"
      label-color="white"
      label="satoshi"
      dense
      step="100"
      data-cy="betAmount"
      :rules="[
        val => val > BET.MIN || 'Min ' + BET.MIN,
        val => val < BET.MAX || 'Max ' + BET.MAX,
      ]"
      type="number"
      v-model.number="bet"
      autocomplete="off"
  />
</template>
<script>
import StoreMixin from "src/mixins/StoreMixin.vue";

export default {
  name: 'BetInput',
  mixins: [StoreMixin]
}
</script>
<style scoped>
text {
  cursor: pointer;
}

</style>
