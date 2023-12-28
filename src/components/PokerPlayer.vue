<template>
  <div :class="getKlass">
    <div v-if="player && player.playerAccountId">
      <div class="my-turn">{{ name }} {{ player.balance }}</div>
      <div class="player-state">
        {{ isMyTurn ? countdownText : getText }}
      </div>
      <div class="player-state" v-if="getBlindText">
        {{ getBlindText }}
      </div>
      <div v-if="playerIsMe" class="you-text">You</div>
    </div>
    <div v-else-if="!joinedTable">
      <q-btn
        label="join"
        class="join-btn"
        @click="joinTable(tableId, player.position)"
      />
    </div>
    <q-img v-else src="../assets/logo-icon-dark.png" width="50px" />
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue"
import { usePokerStore } from "stores/poker-store"
import { useAuthStore } from "stores/auth-store"
import { secondsUntil } from "src/services/dateService"
import { displayName } from "src/services/playerService"
import { getAvatar } from "src/services/avatarService"
import { playerStates, rounds } from "src/constants"
import { get } from "lodash"
import { joinTable } from "src/services/apiService"

const props = defineProps({
  player: {
    type: Object,
    required: true,
  },
})

const pokerStore = usePokerStore()
const authStore = useAuthStore()

const countdownBetTimeoutText = ref("")

const joinedTable = computed(() => pokerStore.joinedTable)
const tableId = computed(() => pokerStore.tableId)

onMounted(() => {
  setInterval(() => {
    const until =
      pokerStore.table && pokerStore.table.betTimeout
        ? secondsUntil(pokerStore.table.betTimeout)
        : 0
    countdownBetTimeoutText.value = until <= 0 ? "" : until
  }, 1000)
})

const getKlass = computed(() => {
  const arr = [
    "player-avatar",
    "object" + props.player.position,
    "row",
    "flex-center",
  ]
  if (isActive.value) return arr.concat(["active"])
  else if (isWaitingForNextRound.value) arr.push("disabled")
  return arr
})

const isActive = computed(() => {
  const pid = get(props.player, "playerAccountId", null)
  return pid === pokerStore.playerTurnId
})

const isWaitingForNextRound = computed(() => {
  return (
    pokerStore.round !== rounds.PRE_FLOP &&
    props.player.state === playerStates.SITTING
  )
})

const countdownText = computed(() =>
  countdownBetTimeoutText.value
    ? `... ${countdownBetTimeoutText.value}s`
    : "..."
)

const name = computed(() => displayName(props.player))
const img = computed(() => getAvatar(props.player))
const playerIsMe = computed(
  () => props.player.playerAccountId === authStore.playerId
)
const isMyTurn = computed(
  () => props.player.playerAccountId === pokerStore.playerTurnId
)

const getBlindText = computed(() => {
  if (pokerStore.round === rounds.PRE_FLOP) {
    const bbO = pokerStore.bigBlindPlayerOpt
    const sbO = pokerStore.smallBlindPlayerOpt
    if (bbO && bbO.player.playerAccountId === props.player.playerAccountId)
      return "BB"
    else if (sbO && sbO.player.playerAccountId === props.player.playerAccountId)
      return "SB"
    else return null
  } else return null
})

const getText = computed(() => props.player.state)
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
