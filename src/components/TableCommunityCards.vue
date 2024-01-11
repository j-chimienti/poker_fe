<template>
  <div class="row card-row">
    <TransitionGroup
      @enter="onEnterCommunityCards"
      @leave="onLeaveCommunityCards"
    >
      <div
        v-for="(card, index) in cards"
        :key="index + card.image"
        :data-index="index"
      >
        <q-img :src="card.image" width="122px" height="176px" />
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { usePokerStore } from "stores/poker-store"
import {
  onEnterCommunityCards,
  onLeaveCards,
  onLeaveCommunityCards,
} from "src/services/animationService"

const pokerStore = usePokerStore()
const cards = computed(() => pokerStore.cards)
</script>

<style scoped lang="scss">
.card-row {
  display: flex;
  justify-content: flex-start; /* Center cards horizontally */
  align-items: center; /* Center cards vertically */
  width: 100%;
  /* Center the row itself */
  margin: auto auto auto 20%;
  flex-wrap: nowrap; /* Wrap cards on smaller screens */
  gap: 0.5rem; /* Space between cards */
}
</style>
