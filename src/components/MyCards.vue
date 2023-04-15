<template>
 <div class="my-cards">
   <FaceUpCard class="q-mx-xs"
               v-for="card in getCards"
               :key="card.id"
               :card="card"/>
 </div>
</template>
<script>
import FaceUpCard from "components/FaceUpCard.vue"
import {get} from "lodash";

export default {
  name: 'MyCards',
  components: {FaceUpCard},
  computed: {

    getCards() {
      return this.hasBestCards ? this.player.bestCards : this.player.cards
    },

    hasBestCards() {
      const bc = get(this.player, "bestCards", [])
      return Boolean(bc.length)
    },
  },
  props: {
    player: {}
  }
}
</script>

<style>
.my-cards {
  position: fixed;
  bottom: 10px;
  left: 15px;
}
</style>
