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
//:root {
//  --card-width: 7.625rem; /* 122px equivalent if 1rem = 16px */
//  --card-height: 11rem; /* 176px equivalent if 1rem = 16px */
//}
//
//@media (max-width: 600px) {
//  :root {
//    --card-width: 5rem; /* Smaller width for mobile screens */
//    --card-height: 7rem; /* Smaller height for mobile screens */
//  }
//}

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

//.card-row .q-img {
//  width: var(--card-width);
//  height: var(--card-height);
//}
</style>
