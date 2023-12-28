<template>
  <div class="max-bet flex justify-between">
    <div style="text-transform: capitalize">current bet:</div>
    <div v-if="maxBet">{{ maxBetFormatted }}</div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { usePokerStore } from "stores/poker-store"
import { formatToUSD } from "src/services/moneyUtils"

const store = usePokerStore()
const maxBet = store.maxBet
const maxBetFormatted = computed(() => formatToUSD(store.maxBet))
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
