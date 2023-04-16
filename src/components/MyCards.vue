<template>
 <div class="my-cards" v-if="playerOpt">
   <q-img v-for="card in getCards" :src="card.image" :key="card.id" width="122px" height="176px"/>
 </div>
</template>
<script>
import {get} from "lodash";
import {mapState} from "pinia";
import {usePokerStore} from "stores/poker-store";
import PlayingCard from "components/PlayingCard.vue";

export default {
  name: 'MyCards',
  components: {PlayingCard},
  computed: {

    ...mapState(usePokerStore, ['playerOpt']),
    getCards() {
      const cards = get(this.playerOpt, 'cards', [])
      if (this.hasBestCards.length) return this.hasBestCards
      else if (cards.length)
      return cards
      return []
    },

    hasBestCards() {
      return get(this.playerOpt, "bestCards", [])

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
