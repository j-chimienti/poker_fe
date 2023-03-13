<template>
  <q-card :class="getKlass"
          class="q-pa-md q-ma-md"
          style="min-height: 240px"
  >
    <q-card-section>
      <div class="row justify-start wrap">
        <q-chip>
          <q-avatar>
            <img :src="img">
            <q-chip v-if="playerIsMe" label="star"/>
          </q-avatar>
          {{playerName(player)}}
        </q-chip>
        <q-chip v-if="showing">move:{{player.state}}</q-chip>
        <q-chip class="bg-yellow" v-if="player.winner">winner</q-chip>
        <q-chip class="bg-orange" v-if="player.allIn">ALL_IN</q-chip>
        <q-chip v-if="player.sb || player.bb">
          <span v-if="player.sb">SB</span>
          <span v-else-if="player.bb">bb</span>
        </q-chip>
        <q-chip>bet=<PlayerAccountBalance :balance="player.bet"/></q-chip>
        <q-chip>
          <PlayerAccountBalance :balance="player.balance"/>
        </q-chip>
        </div>
    </q-card-section>
  <q-card-section>

      <div v-if="playerIsMe">
        <FaceUpCard v-for="card in player.cards" :key="card.id" :card="card"/>
      </div>
      <div v-else>
        <div v-if="player.bestCards.length">
          <FaceUpCard v-for="card in player.bestCards" :key="card.id" :card="card"/>
        </div>
        <div v-else>
          <FaceDownCard  v-for="(card, i) in player.cards" :key="i"/>
        </div>
      </div>
    <q-circular-progress
      show-value
      class="text-white q-ma-md"
      :value="countdownBetTimeoutText"
      size="50px"
      :thickness="0.2"
      color="orange"
      :min="0"
      :max="30"
      track-color="transparent"
      v-if="isMyTurn && countdownBetTimeoutText > 0"
    >
      <q-icon name="timer" />
    </q-circular-progress>
    <q-circular-progress
      v-else
      class="text-white q-ma-md"
      size="50px"
      :thickness="0.2"
      color="red"
    >
      <q-icon name="person_off" />
    </q-circular-progress>
    </q-card-section>
    <q-card-actions style="min-height: 50px;">
      <q-chip v-if="player.bestPoint && player.bestPoint.message">{{player.bestPoint.message}}</q-chip>
    </q-card-actions>
  </q-card>
</template>
<script>
import FaceUpCard from "components/FaceUpCard.vue"
import {mapState} from "pinia";
import {usePokerStore} from "stores/poker-store";
import {useAuthStore} from "stores/auth-store";
import {secondsUntil} from "src/services/dateService";
import PlayerAccountBalance from "components/PlayerAccountBalance.vue";
import {playerName} from "src/services/playerService";
import FaceDownCard from "components/FaceDownCard.vue";
export default {
  name: 'PokerPlayer',
  components: {FaceDownCard, PlayerAccountBalance, FaceUpCard},
  data() { return {showing: false, countdownBetTimeoutText: 0 }},
  mounted() {
    setInterval(this.checkIf, 1000)
  },
  methods: {
    playerName,
    checkIf() {
      this.countdownBetTimeoutText = this.table && this.table.betTimeout ? secondsUntil(this.table.betTimeout) : -1
    }
  },
  computed: {
    getKlass() {
      if (this.player.winner) return "bg-purple"
      else if (this.isMyTurn) return "bg-green"
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
    ...mapState(usePokerStore, ['pokerPlayers','table', 'playerTurn', 'pokerPlayersByPosition']),
    ...mapState(useAuthStore, ['playerId']),
  },
  watch: {
    'player.state'(n, o) {
      if (n && n!== 'READY' && n !== o) {
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
