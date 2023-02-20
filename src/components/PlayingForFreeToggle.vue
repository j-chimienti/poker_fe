<template>
  <q-toggle
      :label="`Playing for ${playingFor}`"
      data-cy="playingForToggle"
      color="orange"
      icon="check"
      false-value="FREE"
      true-value="BTC"
      v-model="playingFor"
  />
</template>
<script>
import StoreMixin from "../mixins/StoreMixin.vue";

export default {
  name: 'PlayingForFreeToggle',
  mixins: [StoreMixin]
}
</script>
<style scoped>
text {
  cursor: pointer;
}

</style>
