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
import PlayingCard from "components/PlayingCard.vue"

export default {
  name: "MyCards",
  components: { PlayingCard },
  computed: {
    ...mapState(usePokerStore, ["myCards, bestCards"]),
    getCards() {
      if (this.bestCards.length) return this.bestCards
      else if (this.myCards.length) return this.myCards
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
