<template>
  <q-card :class="getKlass"
          class="q-pa-md q-ma-md"
          style="min-height: 240px"
  >
    <q-chip :class="getKlass">
      <q-avatar>
        <img :src="img">
        <q-chip v-if="playerIsMe" label="star"/>
      </q-avatar>
      {{player.playerAccountId}}
    </q-chip>
    <q-chip>position={{player.position}}</q-chip>
    <q-chip>bet={{player.bet}}</q-chip>
    <q-chip>balance={{player.balance}}</q-chip>
    <q-chip>{{player.state}}</q-chip>
    <q-chip v-if="player.sb">SMALL_BLIND</q-chip>
    <q-chip v-else-if="player.bb">BIG_BLIND</q-chip>
    <div v-if="playerIsMe">
      <FaceUpCard v-for="card in player.cards" :key="card.id" :card="card"/>
    </div>
    <div v-else>
      <FaceUpCard v-for="card in player.cards" :key="card.id" :card="card"/>
      <!--        <FaceDownCard  v-for="card in player.cards" :key="card.id"/>-->
    </div>
    <q-chip v-if="showing">move:{{player.state}}</q-chip>
    <q-chip v-if="player.winner" size="lg" class="bg-purple">winner!!</q-chip>
    <q-chip v-if="player.bestPoint && player.bestPoint.message">{{player.bestPoint.message}}</q-chip>
  </q-card>
</template>
<script>
import FaceUpCard from "components/FaceUpCard.vue"
import {mapState} from "pinia";
import {usePokerStore} from "stores/poker-store";
import {useAuthStore} from "stores/auth-store";
import {get as _get} from 'lodash'
export default {
  name: 'PokerPlayer',
  components: {FaceUpCard},
  data() { return {showing: false}},
  computed: {
    getKlass() {
      if (this.player.playerAccountId === this.playerTurn) return "bg-green"
      else if (this.player.leaving || this.player.state === "FOLDED") return "bg-grey"
      else return ""
    },
    img() {
      return this.playerIsMe ? "https://cdn.quasar.dev/img/boy-avatar.png" : "https://cdn.quasar.dev/img/avatar.png"
    },
    playerIsMe() {
      return this.player.playerAccountId === this.playerId
    },
    ...mapState(usePokerStore, ['pokerPlayers', 'playerTurn', 'pokerPlayersByPosition']),
    ...mapState(useAuthStore, ['playerId']),
    playerState() {
      return _get(this.player, 'state', null)
    }

  },
  watch: {
    playerState(n, o) {
      if (n && n !== o) {
        this.showing = true
        setTimeout(() => this.showing = false, 2000)
      }
    }
  },
  props: {
    player: {}
  }
}
</script>
