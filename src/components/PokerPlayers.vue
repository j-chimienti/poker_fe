<template>
  <div v-for="spot in seats" :key="spot.position">
    <PokerPlayer :player="spot" />
  </div>
</template>

<script setup>
import {computed} from "vue"
import {usePokerStore} from "stores/poker-store"
import PokerPlayer from "components/PokerPlayer.vue"

const pokerStore = usePokerStore()
const seats = computed(() => pokerStore.seats)
</script>

<style lang="scss"></style>
