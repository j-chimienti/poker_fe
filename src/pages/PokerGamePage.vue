<template>
  <SplashScreen v-if="!table"></SplashScreen>
  <div v-else>
    <ChatMessages :table-id="table.id" />
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
    <div v-if="table" class="row flex-center q-ma-md">
      <PokerTable />
    </div>

    <div class="table-pot row flex-center">Pot: {{ pot }}</div>
    <div class="row flex-center small q-my-sm">Hand: {{ hand }}</div>
    <div class="row flex-center small q-my-sm" v-if="countdown">
      next hand: {{ countdown }}s
    </div>
    <PlayerPokerButtons />
    <PlayerBalance />
    <MyCards />
    <RaiseTheBetModal />
    <BetModal />
    <CallTheBetModal />
    <PlayAnotherHandModal />
    <FoldModal />
  </div>
</template>

<script>
import PokerTable from "components/PokerTable.vue"
import { usePokerStore } from "stores/poker-store"
import { leave } from "src/services/apiService"
import { mapActions, mapState } from "pinia"
import ChatMessages from "components/ChatMessages.vue"
import ApiMixin from "src/mixins/ApiMixin.vue"
import MyCards from "components/MyCards.vue"
import SplashScreen from "components/SplashScreen.vue"
import { formatToUSD } from "src/services/moneyUtils"
import PlayerBalance from "components/PlayerBalance.vue"
import TableMaxBet from "components/TableMaxBet.vue"
import RaiseTheBetModal from "components/dialogs/RaiseTheBetModal.vue"
import CallTheBetModal from "components/dialogs/CallTheBetModal.vue"
import FoldModal from "components/dialogs/FoldModal.vue"
import DialogMixin from "src/mixins/DialogMixin.vue"
import { useUiStore } from "stores/ui-store"
import PlayAnotherHandModal from "components/dialogs/PlayAnotherHandModal.vue"
import PlayerPokerButtons from "pages/PlayerPokerButtons.vue"
import BetModal from "components/dialogs/BetModal.vue"
import { get as _get } from "lodash"

export default {
  mixins: [ApiMixin, DialogMixin],
  computed: {
    pot() {
      return formatToUSD(this.table.pot)
    },
    ...mapState(usePokerStore, [
      "table",
      "joinedTable",
      "nextHandStartText",
      "hand",
      "pot",
    ]),
  },
  data() {
    return {
      countdown: null,
      timer: null,
    }
  },
  mounted() {
    if (!this.table) {
      const options = {
        spinner: SplashScreen,
        message: "Loading. Hang on...",
      }
      this.$q.loading.show(options)
    }
    this.timer = setInterval(() => {
      const nhs = _get(this.table, "nextHandStart", null)
      if (!nhs) this.countdown = null
      else {
        const diff = Math.floor(
          (new Date(nhs).getTime() - new Date().getTime()) / 1000
        )
        if (diff <= 0) this.countdown = null
        this.countdown = diff
      }
    }, 1000)
  },
  beforeUnmount() {
    if (this.timer) clearInterval(this.timer)
  },
  watch: {
    table: function (n) {
      if (n && this.$q.loading.isActive) this.$q.loading.hide()
    },
  },
  methods: {
    ...mapActions(usePokerStore, ["openChat"]),

    onLeave() {
      if (this.joinedTable) {
        const id = this.table.id
        leave(id)
      }
    },
    goToLobby() {
      if (this.joinedTable) {
        const id = this.table.id
        leave(id)
      }
      return this.$router.push({ name: "home" })
    },
  },

  components: {
    BetModal,
    PlayerPokerButtons,
    PlayAnotherHandModal,
    FoldModal,
    CallTheBetModal,
    RaiseTheBetModal,
    TableMaxBet,
    PlayerBalance,
    SplashScreen,
    MyCards,
    ChatMessages,
    PokerTable,
  },
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
