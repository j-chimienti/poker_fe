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
    <q-chip>
      <span>position={{player.position}}</span>
      <span v-if="player.sb">SMALL_BLIND</span>
      <span v-else-if="player.bb">BIG_BLIND</span>
    </q-chip>
    <q-chip>bet={{player.bet}}</q-chip>
    <q-chip>balance={{player.balance}}</q-chip>
    <q-chip class="bg-purple" v-if="player.winner">winner</q-chip>
    <q-chip v-else>{{player.state}}</q-chip>
    <div v-if="playerIsMe">
      <FaceUpCard v-for="card in player.cards" :key="card.id" :card="card"/>
    </div>
    <div v-else>
      <FaceUpCard v-for="card in player.cards" :key="card.id" :card="card"/>
      <!--        <FaceDownCard  v-for="card in player.cards" :key="card.id"/>-->
    </div>
    <q-chip v-if="showing">move:{{player.state}}</q-chip>
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
      if (this.isMyTurn) return "bg-green"
      else if (this.player.state ===  "SITTING" || this.player.state === "FOLDED") return "bg-grey"
      else return ""
    },
    img() {
      return this.playerIsMe ? "https://cdn.quasar.dev/img/boy-avatar.png" : "https://cdn.quasar.dev/img/avatar.png"
    },
    playerIsMe() {
      return this.player.playerAccountId === this.playerId
    },
    isMyTurn() {
      return this.player.playerAccountId === this.playerTurn
    },
    ...mapState(usePokerStore, ['pokerPlayers', 'playerTurn', 'pokerPlayersByPosition']),
    ...mapState(useAuthStore, ['playerId']),


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
