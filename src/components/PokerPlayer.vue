<template>
  <div :class="getKlass">
    <div  :class="getColumnClass">
      <div class="row justify-start">
<!--        <img :src="img">-->
        <div>
          <div v-if="table.winner && player.bestPoint && player.bestPoint.message">
            <q-badge :ripple="false"
                     :clickable="false"
                     floating
            >{{ player.bestPoint.message }}
            </q-badge>
          </div>
          <q-badge v-else floating :ripple="false" :color="getPlayerState(player.state)">{{ player.state }}</q-badge>
        </div>
      </div>
      <div class="row q-my-sm">
        <q-chip :ripple="false">
          <TweenedNumber :balance="player.balance"/>
        </q-chip>
      </div>
    </div>
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
    checkIf() {
      const until = this.table && this.table.betTimeout ? secondsUntil(this.table.betTimeout) : 0
      this.countdownBetTimeoutText = until <= 0 ? '' : until
    },
  },
  computed: {

    name() {
      return displayName(this.player)
    },

    getColumnClass() {
      if (this.player.position === 1) return 'column'
      else if (this.player.position === 2) return 'column'
      else if (this.player.position === 3) return 'column'
      else if (this.player.position === 4) return 'row reverse'
      else if (this.player.position === 5) return 'row reverse'
      else if (this.player.position === 6) return 'column reverse'
      else if (this.player.position === 7) return 'column reverse'
      else if (this.player.position === 8) return 'column reverse'
      else if (this.player.position === 9) return 'row'
      else if (this.player.position === 10) return 'row'
      else {
        return ''
      }
    },

    img() {

      return getAvatar(this.player)

    },
    getKlass() {
      return ['object' + this.player.position]
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

