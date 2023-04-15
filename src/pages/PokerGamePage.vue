<template>
  <div class="row flex justify-between q-ma-md">
    <q-img src="../assets/logo-game-page.png" width="204px"/>
    <q-img src="../assets/exit.png" width="77px" height="77px" @click="onLeave"/>
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
        <q-btn  @click="onRaise"  color="secondary" label="raise"/>
        <q-btn  @click="call(table.id)" color="secondary" label="call"/>
        <q-btn  @click="fold(table.id)" color="secondary" label="fold"/>
      </div>
    </div>
</template>

<script>
import PokerTable from "components/PokerTable.vue"
import {usePokerStore} from "stores/poker-store";
import {leave, raise, subscribeTable} from "src/services/apiService";
import {mapState} from "pinia";
import ChatMessages from "components/ChatMessages.vue";
import SendMessageForm from "components/SendMessageForm.vue";
import ApiMixin from "src/mixins/ApiMixin.vue";
import {canPlaceBet} from "src/services/playerService";

export default {
  mixins: [ApiMixin],
  computed: {
    ...mapState(usePokerStore, ['table', 'joinedTable', 'round', 'playerOpt']),
    canPlace() {
      return this.joinedTable && canPlaceBet(this.playerOpt)
    }
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


  },

  components: {
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
