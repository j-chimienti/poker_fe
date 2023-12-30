<template>
  <div class="max-bet flex justify-between">
    <div style="text-transform: capitalize">current bet:</div>
    <AnimatedNumberUSD :number="maxBet" />
  </div>
</template>

<script setup>
import { usePokerStore } from "stores/poker-store"
import AnimatedNumberUSD from "components/AnimatedNumberUSD.vue"
import { computed } from "vue"

const store = usePokerStore()
const maxBet = computed(() => store.maxBet)
</script>

<style scoped>
.max-bet {
  background: #ffffff;
  /* Cartoon Shadow */
  box-shadow: -3px 3px 0px 1px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  font-family: "Mukta";
  padding-top: 8px;
  padding-left: 11px;
  padding-right: 11px;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 40px;
  /* Eucalyptus */
  color: #248f5c;
}
</style>
