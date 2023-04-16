<template>
    <div :class="'object' + player.position + ' pokercards'">
        <div style="position: relative" v-if="hasBestCards">
          <q-img
              v-for="(card, idx) in getCards"
              :src="card.image"
              :class="getStyle(idx, card)"
              :key="card.id"
              width="61px"
              height="88px"
          />
        </div>
      <div v-else-if="player.cards.length">
        <q-img src="../assets/down-cards.png" width="75px"/>
      </div>
  </div>
</template>
<script>
import RouterMixin from "src/mixins/RouterMixin.vue";
import {get} from "lodash";
import {mapState} from "pinia";
import {useAuthStore} from "stores/auth-store";
import MyCards from "components/MyCards.vue";
import PlayingCard from "components/PlayingCard.vue";

export default {
  name: 'PokerPlayerCards',
  mixins: [RouterMixin],
  components: {PlayingCard, MyCards},

  methods: {

    getStyle(i) {
      return (i === 1) ?  'right-child' : 'left-child'
    },

  },
  computed: {

    getCards() {
      return this.hasBestCards ? this.player.bestCards : this.player.cards
    },

    hasBestCards() {
      const bc = get(this.player, "bestCards", [])
      return Boolean(bc.length)
    },


    ...mapState(useAuthStore, ['playerId']),
  },

  props: {
    player: {}
  }
}
</script>
<style>
.left-child {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}

.right-child {
  position: absolute;
  left: 15px;
  top: 15px;
  z-index: 2;
}
</style>
