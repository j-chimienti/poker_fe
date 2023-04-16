<template>
  <div class="row flex justify-between q-ma-md">
    <q-img class="cursor-pointer" src="../assets/logo-game-page.png" width="204px" @click="goToLobby"/>
    <q-img class="cursor-pointer" src="../assets/exit.png" width="77px" height="77px" @click="onLeave"/>
  </div>
    <div v-if="table" class="row flex-center q-ma-md">
        <PokerTable />
    </div>
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
  <MyCards/>
</template>

<script>
import PokerTable from "components/PokerTable.vue"
import {usePokerStore} from "stores/poker-store";
import {leave, raise, subscribeTable} from "src/services/apiService";
import {mapState} from "pinia";
import ChatMessages from "components/ChatMessages.vue";
import SendMessageForm from "components/SendMessageForm.vue";
import ApiMixin from "src/mixins/ApiMixin.vue";
import MyCards from "components/MyCards.vue";

export default {
  mixins: [ApiMixin],
  computed: {
    ...mapState(usePokerStore, ['table', 'joinedTable', 'round', 'playerOpt', 'myTurn']),

  },
  data() {
    return {   countdownBetTimeoutText: '', raiseAmount: 100 }
  },
  unmounted() { clearInterval(this.interval) },
 mounted() {
   setInterval(this.sendSubscribeTable, 1000 * 15)
 },
  methods: {
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
    MyCards,
    SendMessageForm,
    ChatMessages,
    PokerTable
  }
}
</script>

<style>
.player-actions {
  margin-top: 200px;
}
</style>
