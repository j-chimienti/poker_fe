<template>
    <div v-if="table">
      <PokerTable />
      <q-footer class="bg-transparent">
        <div class="row flex-center">
          <div v-if="joinedTable">
            <q-form @submit="onRaise">
              <q-input type="number" v-model.number="raiseAmount"/>
            </q-form>
          </div>
          <q-btn-group v-if="joinedTable" push>
            <q-btn @click="onRaise"  push color="accent" label="raise"/>
            <q-btn @click="call(table.id)" push color="positive" label="call"/>
            <q-btn @click="fold(table.id)" push color="negative" label="fold"/>
          </q-btn-group>
          <q-btn push v-if="joinedTable" @click="onLeave(table.id)" color="warning" label="leave" />
          <q-btn push v-else   @click="join(table.id)" color="secondary" label="join"/>
        </div>
      </q-footer>
    </div>
</template>

<script>
import PokerTable from "components/PokerTable.vue"
import {usePokerStore} from "stores/poker-store";
import {call, fold, join, leave, raise, subscribeTable} from "src/services/apiService";
import {mapState} from "pinia";

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
        console.log("table not found " + id)
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
    PokerTable
  }
}
</script>

