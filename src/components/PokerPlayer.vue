<template>
  <div :class="getKlass">
      <div class="row justify-start wrap">
        <q-chip
          :color="player.winner ? 'positive' : null"
        >
          <q-avatar>
            <img :src="img(player.position)">
          </q-avatar>
          {{player.name}}
        </q-chip>
        <q-popup-edit
          dark
          v-if="playerIsMe"
          v-model="playerNameCustom"
          v-slot="scope"
          @save="setPlayerName"
        >
          <q-input
            v-model="scope.value"
            dense autofocus counter @keyup.enter="scope.set"
          />
        </q-popup-edit>
        <q-chip class="bg-orange" v-if="player.allIn">ALL_IN</q-chip>
        <q-chip v-if="player.sb || player.bb">
          <span v-if="player.sb">SB</span>
          <span v-else-if="player.bb">BB</span>
        </q-chip>
        <q-chip>
          <TweenedNumber :balance="player.balance"/>
        </q-chip>
        </div>

      <div v-if="playerIsMe">
        <FaceUpCard v-for="card in player.cards" :key="card.id" :card="card"/>
      </div>
      <div v-else>
        <div v-if="player.bestCards && Array.isArray(player.bestCards) && player.bestCards.length">
          <FaceUpCard v-for="card in player.bestCards" :key="card.id" :card="card"/>
        </div>
        <div v-else>
          <FaceDownCard  v-for="(card, i) in player.cards" :key="i"/>
        </div>
      </div>
    <q-chip
      color="info"
      icon="timer"
        v-if="isMyTurn && countdownBetTimeoutText > 0"
    >
      {{countdownBetTimeoutText}}
    </q-chip>
    <div v-else-if="table.winner">
      <q-chip
        :color="player.winner ? 'success' : null"
        v-if="player.bestPoint && player.bestPoint.message">{{player.bestPoint.message}}</q-chip>
    </div>
     <q-chip v-else :color="getPlayerState(player.state)">{{player.state}}</q-chip>
  </div>
</template>
<script>
import FaceUpCard from "components/FaceUpCard.vue"
import {mapState} from "pinia";
import {usePokerStore} from "stores/poker-store";
import {useAuthStore} from "stores/auth-store";
import {secondsUntil} from "src/services/dateService";
import TweenedNumber from "components/TweenedNumber.vue";
import {playerName} from "src/services/playerService";
import FaceDownCard from "components/FaceDownCard.vue";
import {change_name} from "src/services/apiService";
export default {
  name: 'PokerPlayer',
  components: {FaceDownCard, TweenedNumber, FaceUpCard},
  data() { return {showing: false, countdownBetTimeoutText: 0, playerNameCustom: this.player.name }},
  mounted() {
    setInterval(this.checkIf, 1000)
  },
  methods: {
    getPlayerState(s) {
      if (s === "FOLDED") return "negative"
      else if (s === "CALLED") return "positive"
      else if (s === "BETTED") return "positive"
      else if (s === "RAISED") return "accent"
      else if (s === "READY") return "positive"
    },
    setPlayerName(n) {
      change_name(n)
    },
    playerName,
    checkIf() {
      this.countdownBetTimeoutText = this.table && this.table.betTimeout ? secondsUntil(this.table.betTimeout) : -1
    },
    img(position) {
      return this.playerIsMe ? "https://cdn.quasar.dev/img/boy-avatar.png" : `https://cdn.quasar.dev/img/avatar${position}.jpg`

      // "https://cdn.quasar.dev/img/avatar.png"
    },
  },
  computed: {

    getKlass() {
      return 'object' + this.player.position //+ ' ' + this.bgKlass
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
