<template>
  <div :class="'player' + player.position + ' pokercards'">
    <TransitionGroup
      @enter="onEnterDownCards"
      @leave="onLeaveCards"
      v-if="showCards.length"
    >
      <div
        v-for="(card, idx) in showCards"
        :key="card.id + idx"
        :data-index="idx"
        :class="getStyle(idx, card)"
      >
        <q-img :src="card.image" width="75px" />
      </div>
    </TransitionGroup>
    <Transition v-else @leave="onLeaveCards" @enter="onEnterDownCards">
      <q-img v-if="cards.length" src="../assets/down-cards.png" width="75px" />
    </Transition>
  </div>
</template>
<script setup>
import { computed } from "vue"
import { get } from "lodash"
import { onEnterDownCards, onLeaveCards } from "src/services/animationService"

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
