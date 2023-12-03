<template>
  <div :class="getKlass">
    <div v-if="player && player.playerAccountId">
      <div class="my-turn">{{ name }}</div>
      <div class="player-state">
        {{ isMyTurn ? countdownText : getText }}
      </div>
      <div v-if="playerIsMe" class="you-text">You</div>
      <div v-if="isWaitingForNextRound">Waiting for next round...</div>
    </div>
    <div v-else>
      <q-btn
        label="join"
        class="join-btn"
        v-if="!joinedTable"
        @click="joinTable(table.id, player.position)"
      />
      <q-img v-else src="../assets/logo-icon-dark.png" width="50px" />
    </div>
  </div>
</template>
<script>
import { mapState } from "pinia"
import { usePokerStore } from "stores/poker-store"
import { useAuthStore } from "stores/auth-store"
import { secondsUntil } from "src/services/dateService"
import TweenedNumber from "components/TweenedNumber.vue"
import { displayName } from "src/services/playerService"
import { change_name } from "src/services/apiService"
import { getAvatar } from "src/services/avatarService"
import ApiMixin from "src/mixins/ApiMixin.vue"
import RouterMixin from "src/mixins/RouterMixin.vue"
import PokerPlayerCards from "components/PokerPlayerCards.vue"
import { playerStates, rounds } from "src/constants"

export default {
  name: "PokerPlayer",
  mixins: [RouterMixin, ApiMixin],
  components: { PokerPlayerCards, TweenedNumber },
  data() {
    return { showing: false, countdownBetTimeoutText: "" }
  },
  mounted() {
    setInterval(this.checkIf, 1000)
  },
  methods: {
    getStyle(i) {
      return i === 1 ? "margin-left: -50px" : ""
    },

    setPlayerName(n) {
      change_name(n)
    },
    checkIf() {
      const until =
        this.table && this.table.betTimeout
          ? secondsUntil(this.table.betTimeout)
          : 0
      this.countdownBetTimeoutText = until <= 0 ? "" : until
    },
  },
  computed: {
    isWaitingForNextRound() {
      return (
        this.round !== rounds.PRE_FLOP &&
        this.player.state === playerStates.SITTING
      )
    },
    getKlass() {
      const arr = [
        "player-avatar",
        "object" + this.player.position,
        "row",
        "flex-center",
      ]
      if (this.isActive) return arr.concat(["active"])
      return arr
    },
    isActive() {
      const pid = this.$get(this.player, "playerAccountId", null)
      return pid === this.playerTurn
    },
    countdownText() {
      return this.countdownBetTimeoutText
        ? `... ${this.countdownBetTimeoutText}s`
        : "..."
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
    getText() {
      if (this.round === rounds.PRE_FLOP) {
        const bbO = this.bigBlindPlayerOpt
        const sbO = this.smallBlindPlayerOpt
        if (bbO && bbO.player.playerAccountId === this.player.playerAccountId)
          return "BB"
        else if (
          sbO &&
          sbO.player.playerAccountId === this.player.playerAccountId
        )
          return "SB"
        else return this.player.state
      } else return this.player.state
    },

    ...mapState(usePokerStore, [
      "joinedTable",
      "pokerPlayers",
      "bigBlindPlayerOpt",
      "smallBlindPlayerOpt",
      "round",
      "table",
      "playerTurn",
      "pokerPlayersByPosition",
    ]),
    ...mapState(useAuthStore, ["playerId"]),
  },

  props: {
    player: {
      type: Object,
      required: true,
    },
  },
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
  background: #ff7a41;
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
  font-family: "Mukta";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 18px;
  /* or 56% */

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  text-transform: capitalize;
}
</style>
