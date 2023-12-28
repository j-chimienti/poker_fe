<template>
  <div :class="'object' + player.position + ' pokercards'">
    <div style="position: relative" v-if="showCards.length">
      <q-img
        v-for="(card, idx) in showCards"
        :src="card.image"
        :class="getStyle(idx, card)"
        :key="card.id"
        width="75px"
      />
    </div>
    <div v-else-if="cards.length">
      <q-img src="../assets/down-cards.png" width="75px" />
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue"
import { get } from "lodash"

const props = defineProps({
  player: Object,
})

const showCards = computed(() => get(props.player, "showCards", []))
const cards = computed(() => get(props.player, "cards", []))

const getStyle = (i) => {
  return i === 1 ? "right-child" : "left-child"
}
</script>

<style>
.left-child {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}

.right-child {
  position: absolute;
  left: 15px;
  top: 15px;
  z-index: 2;
}
</style>
