<template>
  <SplashScreen v-if="!table"></SplashScreen>
  <div v-else>
    <ChatMessages :table-id="table.id"/>
    <div class="row flex justify-start q-ma-md">
      <q-img class="cursor-pointer" src="../assets/logo-game-page.png" width="204px" @click="goToLobby"/>
    </div>
    <div class="player-actions-navbar column">
      <q-img class="cursor-pointer q-my-md" src="../assets/exit.png" width="77px" height="77px" @click="onLeave"/>
      <q-img class="cursor-pointer" src="../assets/msg.png" width="77px" height="77px" @click="openChat"/>
    </div>
    <div class="row flex-center bet-container"><TableMaxBet/></div>
    <div v-if="table" class="row flex-center q-ma-md">
      <PokerTable />
    </div>

    <div class="table-pot row flex-center" >Pot: {{pot}}</div>
    <div class="row flex-center player-actions" v-if="joinedTable">
        <q-btn class="player-buttons" :disabled="!myTurn"  @click="raiseTheBetModalVisible = true"  color="secondary" label="raise"/>
        <q-btn class="player-buttons" :disabled="!myTurn"  @click="onCall(table.id)" color="secondary" label="call"/>
        <q-btn class="player-buttons" :disabled="!myTurn"  @click="onFold(table.id)" color="secondary" label="fold"/>
      </div>
    <PlayerBalance/>
    <MyCards/>
    <RaiseTheBetModal/>
    <CallTheBetModal/>

    <FoldModal/>
  </div>
</template>

<script>
import PokerTable from "components/PokerTable.vue"
import {usePokerStore} from "stores/poker-store";
import {leave, raise, subscribeTable} from "src/services/apiService";
import {mapActions, mapState} from "pinia";
import ChatMessages from "components/ChatMessages.vue";
import SendMessageForm from "components/SendMessageForm.vue";
import ApiMixin from "src/mixins/ApiMixin.vue";
import MyCards from "components/MyCards.vue";
import SplashScreen from "components/SplashScreen.vue";
import {formatToUSD} from "src/services/moneyUtils";
import PlayerBalance from "components/PlayerBalance.vue";
import TableMaxBet from "components/TableMaxBet.vue";
import TweenedNumber from "components/TweenedNumber.vue";
import RaiseTheBetModal from "components/dialogs/RaiseTheBetModal.vue";
import CallTheBetModal from "components/dialogs/CallTheBetModal.vue";
import FoldModal from "components/dialogs/FoldModal.vue";
import DialogMixin from "src/mixins/DialogMixin.vue";
import {useUiStore} from "stores/ui-store";

export default {
  mixins: [ApiMixin, DialogMixin],
  computed: {
    pot() {
      return formatToUSD(this.table.pot)
    },
    ...mapState(usePokerStore, ['table', 'joinedTable', 'round', 'playerOpt', 'myTurn', 'chatVisible']),

  },
  data() {
    return {   countdownBetTimeoutText: '',  testCheckbox: false }
  },
  unmounted() { clearInterval(this.interval) },
 mounted() {
    if (!this.table) {
      const options = {
        spinner: SplashScreen,
        message: "Loading. Hang on...",
      }
      this.$q.loading.show(options)
    }
   setInterval(this.sendSubscribeTable, 1000 * 15)
 },
  watch: {
    table: function(n) {
      if (n && this.$q.loading.isActive) this.$q.loading.hide()
    }
  },
  methods: {
    ...mapActions(usePokerStore, ['openChat']),
    ...mapActions(useUiStore, ['onCall', 'onFold']),
    sendSubscribeTable() {
      if (this.table && this.table.id)
      subscribeTable(this.table.id)
      else {
        const id = this.$route.params.id
        if (id) subscribeTable(id)
      }
    },

    onLeave() {
      if (this.joinedTable) {
        const id = this.table.id
        leave(id)
        subscribeTable(id)
      }
    },
    goToLobby() {
      if (this.joinedTable) {
        const id = this.table.id
        leave(id)
      }
      return this.$router.push({name: 'home'})
    },


  },

  components: {
    FoldModal,
    CallTheBetModal,
    RaiseTheBetModal,
    TweenedNumber,
    TableMaxBet,
    PlayerBalance,
    SplashScreen,
    MyCards,
    SendMessageForm,
    ChatMessages,
    PokerTable
  }
}
</script>

<style>
.player-actions {
 position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.player-actions-navbar {
  position: fixed;
  top: 16px;
  right: 38px;
}

.table-pot {
  font-family: 'Mukta';
  font-style: normal;
  font-weight: 800;
  font-size: 40px;
  line-height: 18px;
  /* or 45% */

  display: flex;
  align-items: center;
  text-align: center;

  color: #FFFFFF;
}

.player-buttons {
  /* Auto layout */

  padding: 14px 20px;
  gap: 10px;

  width: 115px;
  height: 48px;
  /* Mango Orange */

  /* Cartoon Shadow */

  box-shadow: -3px 3px 0px 1px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
