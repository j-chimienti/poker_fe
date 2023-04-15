<template>
  <div class="row flex q-ma-md">
    <q-img src="../assets/logo-game-page.png" width="204px"/>
    <q-img src="../assets/exit.png" width="77px" height="77px" @click="onLeave"/>
  </div>
    <div v-if="table" class="row flex-center">
      <div class="table-v2">
        <PokerTable />
      </div>
    </div>
      <q-footer class="bg-transparent">
        <div class="row flex-center">
          <div v-if="canPlace">
            <q-form @submit="onRaise">
              <q-input type="number" v-model.number="raiseAmount"/>
            </q-form>
          </div>
          <div v-if="canPlace">
            <q-btn rounded size="lg" @click="onRaise"  push color="accent" label="raise"/>
            <q-btn rounded size="lg" @click="call(table.id)" push color="positive" label="call"/>
            <q-btn rounded size="lg" @click="fold(table.id)" push color="negative" label="fold"/>
          </div>
          <div class="q-pl-xl">
          </div>
        </div>
      </q-footer>
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
.table-v2 {
  background: url("../assets/poker-table.png") center center no-repeat;
  background-size: contain;
  width: 1080px;
  height: 520px;
}
</style>
