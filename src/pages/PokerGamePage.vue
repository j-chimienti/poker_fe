<template>
  <div v-if="table">
    <div>
      <q-chip>{{table.title}}</q-chip>
      <q-chip>{{table.round}}</q-chip>
      <q-chip>hand:{{table.hand}}</q-chip>
      <q-chip>players:{{Object.keys(table.pokerPlayers).length}}</q-chip>
    </div>
    <BlackJackTableV2 />
    <div v-if="joinedTable" class="row justify-center">
      <q-btn @click="leave(table.id)" color="red" label="leave"/>
      <q-btn @click="bet(table.id, 1000)" color="orange" label="bet"/>
<!--      <q-btn @click="call(table.id)" color="orange" label="call"/>-->
<!--      <q-btn @click="bet(table.id, 2000)" color="orange" label="raise"/>-->
      <q-btn @click="fold(table.id)" color="red" label="fold"/>
    </div>
    <div v-else>

    <q-btn size="lg" @click="join(table.id)" color="green" label="join"/>
    </div>
    <q-btn @click="navigateToLobby" label="lobby" icon="arrow_left" dense/>

  </div>
</template>

<script>
import BlackJackTableV2 from "components/BlackJackTableV2.vue"
import {usePokerStore} from "stores/poker-store";
import {join, leave, bet, fold, call, getTable} from "src/services/apiService";
import {mapState} from "pinia";

export default {
  computed: {
    ...mapState(usePokerStore, ['table', 'joinedTable', 'round'])
  },
  methods: {
    navigateToLobby() {
      if (this.table) leave(this.table.id)
      this.$router.push({name: 'home'})
    },
    join,
    fold,
    leave,
    call,
    bet
  },

  components: {
    BlackJackTableV2
  }
}
</script>

<style scoped>



</style>
