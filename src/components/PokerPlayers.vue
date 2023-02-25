<template>
<div>
  <div class="row flex-center">
    <div v-for="player in players" :key="player">
      <q-chip :class="getKlass(player)">
        <q-avatar>
          <img :src="img(player.playerAccountId)">
        </q-avatar>
        {{player.playerAccountId}}
      </q-chip>
      <q-chip>
        {{player.bet}}
      </q-chip>
      <q-chip>{{player.state}}</q-chip>
      <q-chip :class="{'bg-green': player.playerAccountId === playerTurn}">
        {{player.playerAccountId === playerTurn ? 'my turn' : 'not my turn'}}
      </q-chip>
      <div v-if="playerIsMe(player.playerAccountId)" >
        <FaceUpCard v-for="card in player.cards" :key="card.id" :card="card"/>
      </div>
      <div v-else>
        <FaceDownCard  v-for="card in player.cards" :key="card.id"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {mapState} from "pinia";
import {usePokerStore} from "stores/poker-store";
import FaceDownCard from "components/FaceDownCard.vue";
import {useAuthStore} from "stores/auth-store";
import FaceUpCard from "components/FaceUpCard.vue";

export default {
  name: "PokerPlayers",
  components: {FaceUpCard, FaceDownCard},
  methods: {
    getKlass(player) {
      if (!player.active || player.leaving) return "bg-gray"
      else return "bg-green"
    },
    playerIsMe(id) {
      return id === this.playerId
    },
    img(id) {
      return this.playerIsMe(id) ? "https://cdn.quasar.dev/img/boy-avatar.png" : "https://cdn.quasar.dev/img/avatar.png"
    }
  },
  computed: {
    ...mapState(usePokerStore, ['pokerPlayers', 'playerTurn']),
    ...mapState(useAuthStore, ['playerId']),
    players() {
      return this.pokerPlayers.map(p => p.player)
    },

  }
}
</script>

<style scoped>

</style>
