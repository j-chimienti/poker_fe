<template>
  <div class="player-balance">
    <q-img src="../assets/balance.png" width="155px" height="155px" />
    <div
      style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "
    >
      {{ balance }}
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue"
import {usePokerStore} from "stores/poker-store"

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
</style>
