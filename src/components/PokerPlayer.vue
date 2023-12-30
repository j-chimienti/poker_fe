<template>
  <div
    class="player-avatar column"
    :class="playerClasses.concat(`player${player.position}`)"
  >
    <OpenSeat
      v-if="player.openSeat"
      :table-id="tableId"
      :position="player.position"
    />
    <div v-else-if="player.state === status.FOLDED">
      <q-chip color="secondary">folded</q-chip>
      <q-chip rounded color="secondary">{{ player.name }}</q-chip>
    </div>
    <div v-else>
      <q-avatar v-if="blindText" color="secondary">
        <span>{{ blindText }} </span>
      </q-avatar>
      <q-chip
        rounded
        v-if="isMyTurn"
        color="secondary"
        icon="timer"
        :label="countdownBetTimeoutText"
      />
      <q-chip v-else rounded color="secondary" :label="player.state" />
      <q-chip rounded color="secondary">
        {{ player.name }}
      </q-chip>
      <q-chip color="secondary">
        <AnimatedNumberUSD :number="player.balance" />
      </q-chip>
    </div>
    <div v-if="playerIsMe" class="you-text">You</div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue"
import { usePokerStore } from "stores/poker-store"
import { useAuthStore } from "src/auth/auth-store"
import { playerStates, rounds, status } from "src/constants"
import { secondsUntil } from "src/services/dateService"
import { displayName } from "src/services/playerService"
import OpenSeat from "components/OpenSeat.vue"
import AnimatedNumberUSD from "components/AnimatedNumberUSD.vue"

const props = defineProps({
  player: { type: Object, required: true },
})

const pokerStore = usePokerStore()
const authStore = useAuthStore()
const countdownBetTimeoutText = ref("")

const playerClasses = computed(() => {
  return [
    `player${props.player.position}`,
    "row",
    "flex-center",
    isActive.value ? "active" : "",
    isWaitingForNextRound.value ? "disabled" : "",
  ]
})

const isActive = computed(
  () => props.player.playerAccountId === pokerStore.playerTurnId
)

const isWaitingForNextRound = computed(
  () =>
    pokerStore.round !== rounds.PRE_FLOP &&
    props.player.state === playerStates.SITTING
)
const name = computed(() => displayName(props.player))
const playerIsMe = computed(
  () => props.player.playerAccountId === authStore.playerId
)

const blindText = computed(() => {
  const { bigBlindPlayerOpt, smallBlindPlayerOpt } = pokerStore
  if (pokerStore.round === rounds.PRE_FLOP) {
    return bigBlindPlayerOpt?.player.playerAccountId ===
      props.player.playerAccountId
      ? "BB"
      : smallBlindPlayerOpt?.player.playerAccountId ===
        props.player.playerAccountId
      ? "SB"
      : null
  }
  return null
})
const isMyTurn = computed(
  () => props.player.playerAccountId === pokerStore.playerTurnId
)

const tableId = computed(() => pokerStore.tableId)

let interval = null
onMounted(() => {
  interval = setInterval(updateCountdown, 1000)
})
onUnmounted(() => {
  clearInterval(interval)
})
function updateCountdown() {
  const until = pokerStore.table?.betTimeout
    ? secondsUntil(pokerStore.table.betTimeout)
    : 0
  countdownBetTimeoutText.value = until > 0 ? until : ""
}
</script>

<style lang="scss">
.player-state,
.my-turn {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.player-avatar {
  background-image: url(src/assets/join-disk.png);
  background-size: contain;
  width: 129px;
  height: 129px;
  border-radius: 100%;
  transition: border 0.3s ease, box-shadow 0.3s ease;
  &.active {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); // Subtle shadow for depth
  }

  &.active {
    border: 6px solid $mango_orange;
  }

  // Responsive adjustments
  @media (max-width: 768px) {
    width: 100px; // Smaller size on mobile devices
    height: 100px;
  }
}

.player-state,
.my-turn {
  width: 67px;
  height: 24px;
  background: #ff7a41;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center; // Center content vertically
  margin-top: -67px;
  margin-left: 67px;
  transition: margin 0.3s ease; // Smooth transition for responsive changes

  @media (max-width: 768px) {
    margin-top: -50px; // Adjust position for smaller screens
    margin-left: 50px;
  }
}

.you-text {
  font-family: "Mukta";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 18px;
  color: #ffffff;
  text-transform: capitalize;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 768px) {
    font-size: 24px; // Smaller font size on mobile
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to /* <- this is for Vue 3 */ {
  opacity: 0;
}
</style>
