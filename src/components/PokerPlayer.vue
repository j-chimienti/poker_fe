<template>
  <div :class="getKlass">
    <div v-if="player && player.playerAccountId">
      <div class="my-turn" v-if="isMyTurn">{{playerIsMe ? 'your' : name}} turn</div>
      <div class="player-state">{{ isMyTurn ? countdownText : player.state }}</div>
      <div v-if="playerIsMe" class="you-text">You</div>
    </div>
    <div v-else>
      <q-btn
        label="join"
        class="join-btn"
        v-if="!joinedTable"
        @click="joinTable(table.id, player.position)"   />
      <q-img v-else src="../assets/logo-icon-dark.png" width="50px"/>
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
  data() { return {showing: false, countdownBetTimeoutText: '' }},
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
    getKlass() {
      const arr = ['player-avatar', 'object' + this.player.position, 'row', 'flex-center']
      if (this.isActive) return arr.concat(['active'])
      return arr
    },
    isActive() {
      const pid = this.$get(this.player, 'playerAccountId', null)
      return pid === this.playerTurn
    },
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

    playerIsMe() {
      return this.player.playerAccountId === this.playerId
    },
    isMyTurn() {
      return this.player.playerAccountId === this.playerTurn
    },

    ...mapState(usePokerStore, ['joinedTable', 'pokerPlayers','table', 'playerTurn', 'pokerPlayersByPosition']),
    ...mapState(useAuthStore, ['playerId']),
  },

  props: {
    player: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss">
.player-avatar {
  background-image: url(src/assets/join-disk.png);
  background-size: contain;
  width: 129px;
  height: 129px;
&.active {
   border: 6px solid $mango_orange;
   border-radius: 100%;
 }
}

.player-state {
  width: 67px;
  height: 24px;
  background: #FF7A41;
  /* Cartoon Shadow */
  border-radius: 8px;
  display: flex;
  justify-content: center;
  margin-top: -67px;
  margin-left: 67px;
}

.my-turn {
  margin-top: -67px;
  margin-left: 67px;
}

.you-text {
  font-family: 'Mukta';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 18px;
  /* or 56% */

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #FFFFFF;
  text-transform: capitalize;
}
</style>
