<template>
  <div class="row justify-center">
    <q-btn @click="navigateToLobby" label="lobby" icon="arrow_left" color="secondary" />
    <div v-if="table">
      <div>
        <q-chip>{{table.title}}</q-chip>
        <q-chip>{{table.round}}</q-chip>
        <q-chip>hand:{{table.hand}}</q-chip>
        <q-chip>pot:{{table.pot}}</q-chip>
        <q-chip>players:{{Object.keys(table.pokerPlayers).length}}</q-chip>
      </div>
    </div>
  </div>
  <div v-if="table">
    <BlackJackTableV2 />
    <div class="row justify-center" v-if="joinedTable" >
    <q-btn-group >
      <q-btn @click="raise(table.id, 1000)" color="red" label="raise"/>
      <q-btn @click="call(table.id)" color="blue" label="call"/>
      <q-btn @click="fold(table.id)" color="grey" label="fold"/>
    </q-btn-group>
    </div>
  </div>
  <q-btn v-if="joinedTable" @click="leave(table.id)" color="red" label="leave"/>
  <q-btn v-else size="lg" @click="join(table.id)" color="green" label="join"/>
</template>

<script>
import BlackJackTableV2 from "components/BlackJackTableV2.vue"
import {usePokerStore} from "stores/poker-store";
import {join, leave, raise, fold, call, getTable} from "src/services/apiService";
import {mapState} from "pinia";

export default {
  computed: {
    ...mapState(usePokerStore, ['table', 'joinedTable', 'round'])
  },
  data() {
    return { interval: null }
  },
  mounted() {
    this.interval = setInterval(this.updateStatus, 3000)
  },
  unmounted() { clearInterval(this.interval) },
  methods: {
    async navigateToLobby() {
      if (this.table) {
        try {
          leave(this.table.id)
        } catch (e) {

        }
      }
      return this.$router.push({name: 'home'})
    },
    updateStatus() {
      if (!this.joinedTable) {
        const id = this.$route.params.id
        if (id) getTable(id)
      }
    },
    join,
    fold,
    leave,
    call,
    raise
  },

  components: {
    BlackJackTableV2
  }
}
</script>

<style scoped>



</style>
