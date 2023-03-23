<template>
  <div v-if="playerIsMe || hasBestCards">
    <FaceUpCard class="q-mx-xs"
                v-for="card in getCards" :key="card.id"
                :card="card"/>
  </div>
  <div v-else-if="player.cards.length">
    <FaceDownCard v-for="(card, i) in player.cards" :key="i" :style="getStyle(i)"/>
  </div>
  <div v-else>
    <div class="card-outline"></div>
  </div>
</template>
<script>
import FaceDownCard from "components/FaceDownCard.vue"
import FaceUpCard from "components/FaceUpCard.vue"
import RouterMixin from "src/mixins/RouterMixin.vue";
import {get} from "lodash";
import {change_name} from "src/services/apiService";
import {playerName} from "src/services/playerService";
import {secondsUntil} from "src/services/dateService";
import {getAvatar} from "src/services/avatarService";
import {mapState} from "pinia";
import {usePokerStore} from "stores/poker-store";
import {useAuthStore} from "stores/auth-store";

export default {
  name: 'PokerPlayerCards',
  mixins: [RouterMixin],
  components: {FaceUpCard, FaceDownCard},
  data() { return {showing: false, countdownBetTimeoutText: '', playerNameCustom: get(this.player, 'name', '') }},

  methods: {

    getStyle(i) {
      return (i === 1) ?  'margin-left: -50px' : ''
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

    getCards() {
      return this.hasBestCards ? this.player.bestCards : this.player.cards
    },

    hasBestCards() {
      const bc = get(this.player, "bestCards", [])
      return Boolean(bc.length)
    },
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

  props: {
    player: {}
  }
}
</script>
