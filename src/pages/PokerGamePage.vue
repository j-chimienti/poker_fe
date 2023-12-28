<template>
  <ChatMessages :table-id="tableId" />
  <div class="row flex justify-start q-ma-md">
    <q-img
      class="cursor-pointer"
      src="../assets/logo-game-page.png"
      width="204px"
      @click="goToLobby"
    />
  </div>
  <div class="player-actions-navbar column">
    <q-img
      class="cursor-pointer q-my-md"
      src="../assets/exit.png"
      width="77px"
      height="77px"
      @click="onLeave"
    />
    <q-img
      class="cursor-pointer"
      src="../assets/msg.png"
      width="77px"
      height="77px"
      @click="openChat"
    />
  </div>
  <div class="row flex-center bet-container"><TableMaxBet /></div>
  <div class="row flex-center q-ma-md">
    <PokerTable />
  </div>

  <div class="table-pot row flex-center">Pot: {{ formattedPot }}</div>
  <div class="row flex-center small q-my-sm" v-if="countdown">
    next hand: {{ countdown }}s
  </div>
  <PlayerPokerButtons />
  <PlayerBalance />
  <MyCards />
  <RaiseModal />
  <BetModal />
  <CallModal />
  <FoldModal />
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue"
import { usePokerStore } from "stores/poker-store"
import { useRouter } from "vue-router"
import { formatToUSD } from "src/services/moneyUtils"
import { leave } from "src/services/apiService"
import { get as _get } from "lodash"

// Components
import PokerTable from "components/PokerTable.vue"
import ChatMessages from "components/ChatMessages.vue"
import MyCards from "components/MyCards.vue"
import PlayerBalance from "components/PlayerBalance.vue"
import TableMaxBet from "components/TableMaxBet.vue"
import PlayerPokerButtons from "components/PlayerPokerButtons.vue"
import RaiseModal from "components/dialogs/RaiseModal.vue"
import CallModal from "components/dialogs/CallModal.vue"
import FoldModal from "components/dialogs/FoldModal.vue"
import BetModal from "components/dialogs/BetModal.vue"

const pokerStore = usePokerStore()
const router = useRouter()

const table = computed(() => pokerStore.table)
const joinedTable = computed(() => pokerStore.joinedTable)
const pot = computed(() => pokerStore.pot)
const tableId = computed(() => pokerStore.tableId)

const formattedPot = computed(() => formatToUSD(pot.value))
const countdown = ref(null)
let timer = null

const updateCountdown = () => {
  const nhs = _get(table.value, "nextHandStart", null)
  if (!nhs) {
    countdown.value = null
  } else {
    const diff = Math.floor(
      (new Date(nhs).getTime() - new Date().getTime()) / 1000
    )
    countdown.value = diff > 0 ? diff : null
  }
}

onMounted(() => {
  timer = setInterval(updateCountdown, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

const openChat = () => pokerStore.openChat()
const onLeave = () => {
  if (joinedTable.value) {
    leave(tableId.value)
  }
  goToLobby()
}
const goToLobby = () => {
  router.push({ name: "home" })
}
</script>

<style>
.player-actions-navbar {
  position: fixed;
  top: 16px;
  right: 38px;
}

.table-pot {
  font-family: "Mukta";
  font-style: normal;
  font-weight: 800;
  font-size: 40px;
  line-height: 18px;
  /* or 45% */

  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;
}
</style>
