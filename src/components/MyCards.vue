<template>
  <div class="my-cards">
    <q-img
      v-for="card in myCards"
      :src="card.image"
      :key="card.id"
      width="122px"
      height="176px"
    />
  </div>
</template>
<script setup>
import {usePokerStore} from "stores/poker-store"
import {computed} from "vue"

const myCards = computed(() => usePokerStore().myCards)
</script>

<style>
.my-cards {
  position: fixed;
  bottom: 10px;
  left: 15px;
}
</style>
