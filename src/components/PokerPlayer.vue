<template>
  <div :class="getKlass">
    <div  :class="getColumnClass">
      <div class="row justify-start">
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
        <q-chip>
          <q-avatar rounded>
            <img :src="img">
          </q-avatar>
          {{player.name}}
        </q-chip>

        <div>
          <q-badge :ripple="false"
                   color="warning"
                   floating
                   icon="timer"
                   v-if="isMyTurn"
                   :clickable="false"
          >
            {{ countdownBetTimeoutText }}
          </q-badge>
          <div v-else-if="table.winner && player.bestPoint && player.bestPoint.message">
            <q-badge :ripple="false"
                     :clickable="false"
                     floating
                     :color="player.winner ? 'success' : null"
            >{{ player.bestPoint.message }}
            </q-badge>
          </div>
          <q-badge v-else floating :ripple="false" :color="getPlayerState(player.state)">{{ player.state }}</q-badge>
        </div>

        <q-chip :ripple="false" class="bg-orange" v-if="player.allIn">ALL_IN</q-chip>
        <q-chip :ripple="false" v-if="player.sb || player.bb">
          <span v-if="player.sb">SB</span>
          <span v-else-if="player.bb">BB</span>
        </q-chip>

      </div>
      <div class="row q-my-sm">
        <q-chip :ripple="false">
          <TweenedNumber :balance="player.balance"/>
        </q-chip>
      </div>
      <div class="row q-mt-md">
        <PokerPlayerCards :player="player"/>
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
import {playerName} from "src/services/playerService";
import {change_name} from "src/services/apiService";
import {getAvatar} from "src/services/avatarService";
import {get} from 'lodash'
import ApiMixin from "src/mixins/ApiMixin.vue";
import RouterMixin from "src/mixins/RouterMixin.vue";
import PokerPlayerCards from "components/PokerPlayerCards.vue";

export default {
  name: 'PokerPlayer',
  mixins: [RouterMixin, ApiMixin],
  components: {PokerPlayerCards, TweenedNumber},
  data() { return {showing: false, countdownBetTimeoutText: '', playerNameCustom: get(this.player, 'name', '') }},
  mounted() {
    setInterval(this.checkIf, 1000)
  },
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
      return 'object' + this.player.position
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

