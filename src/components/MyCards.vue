<template>
  <div class="my-cards">
    <transition-group @enter="onEnterPlayerCards" @leave="onLeaveCards">
      <q-img
        v-for="card in myCards"
        :src="card.image"
        :key="card.id"
        class="responsive-card-image"
      />
    </transition-group>
  </div>
</template>
<script setup>
import { usePokerStore } from "stores/poker-store"
import { computed } from "vue"
import { onEnterPlayerCards, onLeaveCards } from "src/services/animationService"

const myCards = computed(() => usePokerStore().myCards)
</script>

<style>
.my-cards {
  position: fixed;
  bottom: 10px;
  left: 15px;
}
.responsive-card-image {
  width: 30vw; /* Adjust the width as a percentage of the viewport width */
  height: auto; /* Maintain the aspect ratio */
  max-width: 122px; /* Optional: Set a max-width if needed */
}

/* Adjustments for smaller screens */
@media (max-width: 600px) {
  .responsive-card-image {
    width: 50vw; /* Increase the width on smaller screens */
  }
}

/* Further adjustments for larger screens if necessary */
@media (min-width: 1200px) {
  .responsive-card-image {
    width: 15vw; /* Decrease the width on larger screens */
  }
}
</style>
