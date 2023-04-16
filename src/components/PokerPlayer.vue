<template>
  <div class="my-turn" v-if="isMyTurn">{{player.name}}'s turn</div>
  <div class="player-state">{{ isMyTurn ? '...' : player.state }}</div>
  <div class="poker-player">
  </div>
</template>
<script>
import {mapState} from "pinia";
import {usePokerStore} from "stores/poker-store";
import {useAuthStore} from "stores/auth-store";
import {secondsUntil} from "src/services/dateService";
import TweenedNumber from "components/TweenedNumber.vue";
import {displayName} from "src/services/playerService";
import {change_name} from "src/services/apiService";
import {getAvatar} from "src/services/avatarService";
import ApiMixin from "src/mixins/ApiMixin.vue";
import RouterMixin from "src/mixins/RouterMixin.vue";
import PokerPlayerCards from "components/PokerPlayerCards.vue";

export default {
  name: 'PokerPlayer',
  mixins: [RouterMixin, ApiMixin],
  components: {PokerPlayerCards, TweenedNumber},
  data() { return {showing: false, countdownBetTimeoutText: '', playerNameCustom: displayName(this.player) }},
  mounted() {
    setInterval(this.checkIf, 1000)
  },
  methods: {
    getStyle(i) {
      return (i === 1) ?  'margin-left: -50px' : ''
    },


    setPlayerName(n) {
      change_name(n)
    },
    checkIf() {
      const until = this.table && this.table.betTimeout ? secondsUntil(this.table.betTimeout) : 0
      this.countdownBetTimeoutText = until <= 0 ? '' : until
    },
  },
  computed: {

    name() {
      return displayName(this.player)
    },



    img() {

      return getAvatar(this.player)

    },
    getKlass() {
      const obj =  ['object' + this.player.position]
      if (!this.isMyTurn) return obj
      return obj.concat(['active'])
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
<style>


.player-state {
  width: 67px;
  height: 24px;
  background: #FF7A41;
  /* Cartoon Shadow */
  border-radius: 8px;
  display: flex;
  justify-content: center;
  margin-top: -180px;
}

.my-turn {
  margin-top: -150px;
  height: 50px;
}
</style>
