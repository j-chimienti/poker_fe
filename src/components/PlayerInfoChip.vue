<template>
  <div class="player-balance">
    <q-img src="../assets/balance.png" width="155px" height="155px" />
    <div class="balance-display">
      <AnimatedNumberUSD :number="balance" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { usePokerStore } from "stores/poker-store"
import AnimatedNumberUSD from "components/AnimatedNumberUSD.vue"

const pokerStore = usePokerStore()
const balance = computed(() => pokerStore.balance)
</script>

<style scoped>
.player-balance {
  position: fixed;
  display: inline-block;
  bottom: 0;
  right: 10px;
}

.balance-display {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px; /* Adjust font size as needed */
}
</style>
