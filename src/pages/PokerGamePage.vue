<template>
  <div v-if="table">
    <BlackJackTableV2 />
    <q-btn @click="join(table.id)" color="green" label="join"/>
    <q-btn @click="leave(table.id)" color="red" label="leave"/>
    <q-btn @click="bet(table.id, 1000)" color="orange" label="bet"/>
    <q-btn @click="navigateToLobby" label="lobby"/>

  </div>
  <p>
    {{JSON.stringify(table, null, 4)}}
  </p>
</template>

<script>
import BlackJackTableV2 from "components/BlackJackTableV2.vue"
import {usePokerStore} from "stores/poker-store";
import {join, leave, bet} from "src/services/apiService";

export default {
  computed: {
    table() { return usePokerStore().table }
  },
  methods: {
    navigateToLobby() {
      leave(this.table.id)
      this.$router.push({name: 'home'})
    }
  },
  setup() {
    return {
      join,
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
