<template>
  <div class="my-cards" v-if="getCards.length">
    <q-img
      v-for="card in getCards"
      :src="card.image"
      :key="card.id"
      width="122px"
      height="176px"
    />
  </div>
</template>
<script>
import { mapState } from "pinia"
import { usePokerStore } from "stores/poker-store"

export default {
  name: "MyCards",
  computed: {
    ...mapState(usePokerStore, ["myCards"]),
    getCards() {
      if (this.myCards.length) return this.myCards
      return []
    },
  },
}
</script>

<style>
.my-cards {
  position: fixed;
  bottom: 10px;
  left: 15px;
}
</style>
