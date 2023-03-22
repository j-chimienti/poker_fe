<template>
    <div v-if="table">
      <PokerTable />
      <ChatMessages :table-id="table.id" style="position: fixed; left: 60px; bottom: 100px; max-height: 250px; overflow-y: scroll;"/>
      <q-footer class="bg-transparent q-pb-lg">
        <div class="row flex-center">
          <SendMessageForm style="position: fixed; left: 10px;"/>
          <div v-if="joinedTable">
            <q-form @submit="onRaise">
              <q-input type="number" v-model.number="raiseAmount"/>
            </q-form>
          </div>
          <div v-if="joinedTable">
            <q-btn rounded size="lg" @click="onRaise"  push color="accent" label="raise"/>
            <q-btn rounded size="lg" @click="call(table.id)" push color="positive" label="call"/>
            <q-btn rounded size="lg" @click="fold(table.id)" push color="negative" label="fold"/>
          </div>
          <div class="q-pl-xl">
            <q-btn size="lg" v-if="joinedTable" @click="onLeave(table.id)" color="warning" label="leave" />
            <q-btn size="lg" push  v-else   @click="join(table.id)" color="secondary" label="join"/>
          </div>
        </div>
      </q-footer>

    </div>
</template>

<script>
import PokerTable from "components/PokerTable.vue"
import {usePokerStore} from "stores/poker-store";
import {call, fold, join, leave, raise, subscribeTable} from "src/services/apiService";
import {mapState} from "pinia";
import ChatMessages from "components/ChatMessages.vue";
import SendMessageForm from "components/SendMessageForm.vue";

export default {
  computed: {
    ...mapState(usePokerStore, ['table', 'joinedTable', 'round'])
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
        subscribeTable(id)
      }
    },
    onRaise() {

      raise(this.table.id, this.raiseAmount)
    },


    onLeave(id) {
      leave(id)
      subscribeTable(id)
    },

    join,
    fold,
    leave,
    call,
    raise
  },

  components: {
    SendMessageForm,
    ChatMessages,
    PokerTable
  }
}
</script>

