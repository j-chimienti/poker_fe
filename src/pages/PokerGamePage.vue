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
    <div class="row flex-center player-actions">
      <div>
        <q-form @submit="onRaise">
          <q-input type="number" v-model.number="raiseAmount"/>
        </q-form>
      </div>
      <div>
        <q-btn :disabled="!myTurn"  @click="onRaise"  color="secondary" label="raise"/>
        <q-btn :disabled="!myTurn"  @click="call(table.id)" color="secondary" label="call"/>
        <q-btn :disabled="!myTurn"  @click="fold(table.id)" color="secondary" label="fold"/>
      </div>
    </div>
    <PlayerBalance/>
    <MyCards/>
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

export default {
  mixins: [ApiMixin],
  computed: {
    pot() {
      return formatToUSD(this.table.pot)
    },
    ...mapState(usePokerStore, ['table', 'joinedTable', 'round', 'playerOpt', 'myTurn', 'chatVisible']),

  },
  data() {
    return {   countdownBetTimeoutText: '', raiseAmount: 100 }
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
    sendSubscribeTable() {
      if (this.table && this.table.id)
      subscribeTable(this.table.id)
      else {
        const id = this.$route.params.id
        if (id) subscribeTable(id)
      }
    },
    onRaise() {
      raise(this.table.id, this.raiseAmount)
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
</style>
