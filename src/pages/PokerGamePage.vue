<template>
    <div v-if="table">
      <TableInfo :countdown-text="countdownText" />
      <PokerTable />
      <q-footer>
        <div class="row flex-center">
          <div v-if="joinedTable">
            <q-form @submit="onRaise">
              <q-input type="number" v-model.number="raiseAmount"/>
            </q-form>
          </div>
          <q-btn-group v-if="joinedTable">
            <q-btn @click="onRaise"  color="red" label="raise"/>
            <q-btn @click="call(table.id)" color="green" label="call"/>
            <q-btn @click="fold(table.id)" color="grey" label="fold"/>
          </q-btn-group>
          <q-btn v-if="joinedTable" @click="onLeave(table.id)" color="red" label="leave" />
          <q-btn v-else   @click="join(table.id)" color="green" label="join"/>
        </div>
      </q-footer>
    </div>
</template>

<script>
import PokerTable from "components/PokerTable.vue"
import {usePokerStore} from "stores/poker-store";
import {call, fold, join, leave, raise, subscribeTable} from "src/services/apiService";
import {mapState} from "pinia";
import {secondsUntil} from "src/services/dateService";
import TableInfo from "pages/TableInfo.vue";

export default {
  computed: {
    ...mapState(usePokerStore, ['table', 'joinedTable', 'round'])
  },
  data() {
    return { interval: null, countdownText: '', countdownBetTimeoutText: '', raiseAmount: 100 }
  },
  unmounted() { clearInterval(this.interval) },
 mounted() {
   this.interval = setInterval(this.handleCountdowns, 1000)
   setInterval(this.sendSubscribeTable, 1000 * 15)
 },
  methods: {
    sendSubscribeTable() {
      if (this.table && this.table.id)
      subscribeTable(this.table.id)
      else {
        const id = this.$route.params.id
        console.log("table not found " + id)
        subscribeTable(id)
      }
    },
    onRaise() {

      raise(this.table.id, this.raiseAmount)
    },
    handleCountdowns() {
      this.countdownText = this.table && this.table.nextHandStart ? secondsUntil(this.table.nextHandStart) : -1
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
    TableInfo,
    PokerTable
  }
}
</script>

