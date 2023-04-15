<template>
    <div   :class="'object' + player.position + ' pokercards'">
      <div>
      <div v-if="playerIsMe">
        <MyCards :player="player"/>
      </div>
        <div v-else-if="hasBestCards">
          <FaceUpCard class="q-mx-xs"
                      v-for="card in getCards"
                      :key="card.id"
                      :card="card"/>
        </div>
      <div v-else-if="player.cards.length">
        <q-img src="../assets/down-cards.png" width="75px"/>
      </div>
      </div>
  </div>
</template>
<script>
import RouterMixin from "src/mixins/RouterMixin.vue";
import {get} from "lodash";
import {mapState} from "pinia";
import {useAuthStore} from "stores/auth-store";
import MyCards from "components/MyCards.vue";
import FaceUpCard from "components/FaceUpCard.vue";

export default {
  name: 'PokerPlayerCards',
  mixins: [RouterMixin],
  components: {FaceUpCard, MyCards},

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
