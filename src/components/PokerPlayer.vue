<template>
  <div :class="getKlass" v-if="player">
      <div class="row justify-start wrap">
        <q-chip
          :clickable="false"
          :ripple="false"
          :color="player.winner ? 'positive' : ''"
        >
          <q-avatar>
            <img :src="img">
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
        <q-chip :ripple="false" class="bg-orange" v-if="player.allIn">ALL_IN</q-chip>
        <q-chip :ripple="false" v-if="player.sb || player.bb">
          <span v-if="player.sb">SB</span>
          <span v-else-if="player.bb">BB</span>
        </q-chip>
        <q-chip :ripple="false">
          <TweenedNumber :balance="player.balance"/>
        </q-chip>
        </div>

        <div v-if="playerIsMe">
          <FaceUpCard class="q-mx-xs" v-for="card in player.cards" :key="card.id" :card="card"/>
        </div>
        <FaceUpCard class="q-mx-sm" v-else-if="hasBestCards(player)" v-for="card in player.bestCards" :key="card.id" :card="card"/>
        <FaceDownCard v-else  v-for="(card, i) in player.cards" :key="i" :style="getStyle(i)"/>
    <div class="row" v-if="player.cards && Array.isArray(player.cards) && player.cards.length === 2">
      <q-chip :ripple="false"
        color="warning"
        icon="timer"
        v-if="isMyTurn"
        :clickable="false"
      >
        {{countdownBetTimeoutText}}
      </q-chip>
      <div v-else-if="table.winner && player.bestPoint && player.bestPoint.message">
        <q-chip :ripple="false"
          :clickable="false"
          :color="player.winner ? 'success' : null"
        >{{player.bestPoint.message}}
        </q-chip>
      </div>
      <q-chip :ripple="false" v-else :color="getPlayerState(player.state)">{{player.state}}</q-chip>
    </div>


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
import {getAvatar} from "src/services/avatarService";
import {get} from 'lodash'

export default {
  name: 'PokerPlayer',
  components: {FaceDownCard, TweenedNumber, FaceUpCard},
  data() { return {showing: false, countdownBetTimeoutText: '', playerNameCustom: this.player.name }},
  mounted() {
    setInterval(this.checkIf, 1000)
  },
  methods: {
    getStyle(i) {
      return (i === 1) ?  'margin-left: -40px' : ''
    },
    hasBestCards(player) {
      const bc = get(player, "bestCards", [])
      return Boolean(bc.length)
    },
    isFolded(state) { return state === 'FOLDED'},
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
      const until = this.table && this.table.betTimeout ? secondsUntil(this.table.betTimeout) : 0
      this.countdownBetTimeoutText = until <= 0 ? '' : until
    },
  },
  computed: {


    img() {

      return getAvatar(this.player)

    },
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

  },
  props: {
    player: {}
  }
}
</script>
