<template>
  <div class="row justify-center">
    <q-btn @click="navigateToLobby" label="lobby" icon="arrow_left" color="secondary" />
    <div>
      <div v-if="table">
        <q-chip>{{table.title}}</q-chip>
        <q-chip>{{table.round}}</q-chip>
        <q-chip>hand:{{table.hand}}</q-chip>
        <q-chip>pot:{{table.pot}}</q-chip>
        <q-chip>players:{{Object.keys(table.pokerPlayers).length}}</q-chip>
        <div  v-if="countdownText > 0">
          next game starts:
          <q-knob
            :min="0"
            :max="15"
            v-model="countdownText"
            size="50px"
            :thickness="0.22"
            class="q-ma-md"
            show-value
          />
        </div>


      </div>
    </div>
  </div>
  <div>
    <PokerTable />
    <div class="row justify-center" v-if="joinedTable && table && table.hand && table.hand !== 'WAITING'" >
      <q-form @submit="onRaise">
        <q-input type="number" v-model.number="raiseAmount"/>
        <q-btn type="submit"  color="red" label="raise"/>
      </q-form>
    <q-btn-group>

      <q-btn @click="call(table.id)" color="blue" label="call"/>
      <q-btn @click="fold(table.id)" color="grey" label="fold"/>
    </q-btn-group>
    </div>
  </div>
  <q-btn v-if="joinedTable" @click="onLeave(table.id)" color="red" label="leave"/>
  <q-btn v-else size="lg" @click="join(table.id)" color="green" label="join"/>
</template>

<script>
import PokerTable from "components/PokerTable.vue"
import {usePokerStore} from "stores/poker-store";
import {call, fold, join, leave, raise, subscribeTable} from "src/services/apiService";
import {mapState} from "pinia";
import {secondsUntil} from "src/services/dateService";

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
 },
  methods: {
    onRaise() {

      raise(this.table.id, this.raiseAmount)
    },
    handleCountdowns() {
      this.countdownText = this.table && this.table.nextHandStart ? secondsUntil(this.table.nextHandStart) : -1
    },
    async navigateToLobby() {
      if (this.table) {
        try {
          leave(this.table.id)
        } catch (e) {
        }
      }
      return this.$router.push({name: 'home'})
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

<style scoped>



</style>
