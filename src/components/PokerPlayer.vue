<template>
  <div class="my-turn" v-if="isMyTurn">{{name}} turn</div>
  <div class="player-state">{{ isMyTurn ? countdownText : player.state }}</div>
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

import avatar1 from "../assets/avatars/1.png";
import avatar2 from "../assets/avatars/2.png";
import avatar3 from "../assets/avatars/3.png";
import avatar4 from "../assets/avatars/4.png";
import avatar5 from "../assets/avatars/5.png";
import avatar6 from "../assets/avatars/6.png";
import avatar7 from "../assets/avatars/7.png";
import avatar8 from "../assets/avatars/8.png";
import avatar9 from "../assets/avatars/9.png";
import avatar10 from "../assets/avatars/10.png";

const avatars = {
  1: avatar1,
  2: avatar2,
  3: avatar3,
  4: avatar4,
  5: avatar5,
  6: avatar6,
  7: avatar7,
  8: avatar8,
  9: avatar9,
  10: avatar10
};

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
    playerImage() {

      const {player} = this
      const img = this.$get(player, 'image', null)
      const pos = this.$get(player, 'position', 1)
      return Boolean(img) ? img : avatars[pos]
    },
    countdownText() {
      return this.countdownBetTimeoutText ? `... ${this.countdownBetTimeoutText}s` : '...'
    },
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
