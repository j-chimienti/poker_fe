<template>
    <div   :class="'object' + player.position" class="pokercards">
      <div v-if="playerIsMe || hasBestCards">
        <FaceUpCard class="q-mx-xs"
                    v-for="card in getCards"
                    :key="card.id"
                    :card="card"/>
      </div>
      <div v-else-if="player.cards.length">
        <FaceDownCard v-for="(card, i) in player.cards" :key="i" :style="getStyle(i)"/>
      </div>
      <div v-else class="card-outline"></div>
  </div>
</template>
<script>
import FaceDownCard from "components/FaceDownCard.vue"
import FaceUpCard from "components/FaceUpCard.vue"
import RouterMixin from "src/mixins/RouterMixin.vue";
import {get} from "lodash";
import {mapState} from "pinia";
import {useAuthStore} from "stores/auth-store";

export default {
  name: 'PokerPlayerCards',
  mixins: [RouterMixin],
  components: {FaceUpCard, FaceDownCard},

  methods: {

    getStyle(i) {
      return (i === 1) ?  'margin-left: -50px' : ''
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

    playerIsMe() {
      return this.player.playerAccountId === this.playerId
    },
    ...mapState(useAuthStore, ['playerId']),
  },

  props: {
    player: {}
  }
}
</script>
