<template>
<div>
  <div class="row flex-center">
    <div v-for="player in players" :key="player">
      <q-chip :class="getKlass(player)">
        <q-avatar>
          <img :src="img(player.playerAccountId)">
        </q-avatar>
        {{player.name.slice(0, 10)}}
      </q-chip>
      <q-chip>
        {{player.bet}}
      </q-chip>
      <FaceUpCard v-if="playerIsMe(player.playerAccount)" v-for="card in player.cards" :key="card.id"/>
      <FaceDownCard v-else v-for="card in player.cards" :key="card.id"/>
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
    ...mapState(usePokerStore, ['pokerPlayers']),
    ...mapState(useAuthStore, ['playerId']),
    players() {
      return this.pokerPlayers.map(p => p.player)
    },

  }
}
</script>

<style scoped>

</style>
