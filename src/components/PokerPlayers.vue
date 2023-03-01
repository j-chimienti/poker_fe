<template>
<div>
  <div class="row flex-center" >
    <q-card v-for="player in players" :key="player"
         :class="getKlass(player)"
            class="q-pa-md q-ma-md"
    >
      <q-chip :class="getKlass(player)">
        <q-avatar>
          <img :src="img(player.playerAccountId)">
        </q-avatar>
        {{player.playerAccountId}}
      </q-chip>
      <q-chip>position={{player.position}}</q-chip>
      <q-chip>bet={{player.bet}}</q-chip>
      <q-chip>balance={{player.balance}}</q-chip>
      <q-chip>{{player.state}}</q-chip>
      <q-chip v-if="player.sb">SMALL_BLIND</q-chip>
      <q-chip v-else-if="player.bb">BIG_BLIND</q-chip>
      <q-chip>
        {{player.playerAccountId === playerTurn ? 'my turn' : 'not my turn'}}
      </q-chip>
      <div v-if="playerIsMe(player.playerAccountId)" >
        <FaceUpCard v-for="card in player.cards" :key="card.id" :card="card"/>
      </div>
      <div v-else>
        <FaceUpCard v-for="card in player.cards" :key="card.id" :card="card"/>
<!--        <FaceDownCard  v-for="card in player.cards" :key="card.id"/>-->
      </div>
    </q-card>
  </div>
</div>
</template>

<script>
import {mapState} from "pinia";
import {usePokerStore} from "stores/poker-store";
import {useAuthStore} from "stores/auth-store";
import FaceUpCard from "components/FaceUpCard.vue";

export default {
  name: "PokerPlayers",
  components: {FaceUpCard},
  methods: {
    getKlass(player) {
      if (player.playerAccountId === this.playerTurn) return "bg-green"
      else if (player.leaving || player.state === "FOLDED") return "bg-grey"
      else return ""
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
