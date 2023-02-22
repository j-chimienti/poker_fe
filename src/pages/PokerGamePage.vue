<template>
  <div v-if="table">
<!--    <h5>{{round}}</h5>-->
    <BlackJackTableV2 />
    <div v-if="joinedTable">
      <q-btn @click="leave(table.id)" color="red" label="leave"/>
      <q-btn @click="bet(table.id, 1000)" color="orange" label="bet"/>
      <q-btn @click="fold(table.id)" color="red" label="fold"/>
    </div>
    <div v-else>

    <q-btn size="lg" @click="join(table.id)" color="green" label="join"/>
    </div>
    <q-btn @click="navigateToLobby" label="lobby" icon="arrow_left" dense/>

  </div>
  <p>
    {{JSON.stringify(table, null, 4)}}
  </p>
</template>

<script>
import BlackJackTableV2 from "components/BlackJackTableV2.vue"
import {usePokerStore} from "stores/poker-store";
import {join, leave, bet, fold} from "src/services/apiService";
import {mapState} from "pinia";

export default {
  computed: {
    ...mapState(usePokerStore, ['table', 'joinedTable', 'round'])
  },
  methods: {
    navigateToLobby() {
      if (this.table) leave(this.table.id)
      this.$router.push({name: 'home'})
    }
  },
  setup() {
    return {
      join,
      fold,
      leave,
      bet

    }
  },
  components: {
    BlackJackTableV2
  }
}
</script>

<style scoped>



</style>
