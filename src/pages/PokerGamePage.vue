<template>
  <ChatMessages :table-id="tableId" />
  <div class="row flex justify-start q-ma-md">
    <q-img
      class="cursor-pointer"
      src="../assets/logo-game-page.png"
      width="204px"
      @click="requestToLeaveTable"
    />
  </div>
  <div class="player-actions-navbar column">
    <q-img
      class="cursor-pointer q-my-md"
      src="../assets/exit.png"
      width="77px"
      height="77px"
      @click="requestToLeaveTable"
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

  <div class="table-pot row flex-center">
    Pot: <AnimatedNumberUSD :number="pot" />
  </div>
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
  <ConfirmLeaveTableModal />
  <PageTitle />
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue"
import { usePokerStore } from "stores/poker-store"
import { useRouter } from "vue-router"
import _get from "lodash.get"
// Components
import PokerTable from "components/PokerTable.vue"
import ChatMessages from "components/ChatMessages.vue"
import MyCards from "components/MyCards.vue"
import PlayerBalance from "components/PlayerInfoChip.vue"
import TableMaxBet from "components/TableMaxBet.vue"
import PlayerPokerButtons from "components/PlayerPokerButtons.vue"
import RaiseModal from "components/dialogs/RaiseModal.vue"
import CallModal from "components/dialogs/CallModal.vue"
import FoldModal from "components/dialogs/FoldModal.vue"
import BetModal from "components/dialogs/BetModal.vue"
import ConfirmLeaveTableModal from "components/dialogs/ConfirmLeaveTableModal.vue"
import { useUiStore } from "stores/ui-store"
import { pages } from "src/constants"
import PageTitle from "components/MyTurnWatcher.vue"
import AnimatedNumberUSD from "components/AnimatedNumberUSD.vue"

const pokerStore = usePokerStore()
const router = useRouter()

const table = computed(() => pokerStore.table)
const joinedTable = computed(() => pokerStore.joinedTable)
const pot = computed(() => pokerStore.pot)
const tableId = computed(() => pokerStore.tableId)

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
const requestToLeaveTable = () => {
  if (joinedTable.value) {
    useUiStore().confirmLeaveTableModalVisible = true
  } else router.push({ name: pages.lobby })
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
