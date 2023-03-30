<template>
  <div class="row justify-center">
    <q-btn @click="goToLobby" label="lobby"   color="secondary"/>
      <div v-if="table">
        <q-chip :ripple="false">{{table.title}}</q-chip>
        <q-chip :ripple="false" v-if="countdownText > 0" color="orange">
          <div>next hand: {{countdownText}}s</div>
        </q-chip>
        <span v-else>
          <q-chip :ripple="false">{{table.round}}</q-chip>
          <q-chip :ripple="false">hand: <TweenedNumber :balance="table.hand" /></q-chip>
          <q-chip :ripple="false">pot: <TweenedNumber :balance="table.pot" /></q-chip>
        </span>
        <TableConfig/>
    </div>
  </div>
</template>
<script>
import {navigateToLobby} from "src/services/apiService";
import {mapState} from "pinia";
import {usePokerStore} from "stores/poker-store";
import {secondsUntil} from "src/services/dateService";
import TweenedNumber from "components/TweenedNumber.vue";
import TableConfig from "components/TableConfig.vue";

export default {
  name: 'TableInfo',
  components: {TableConfig, TweenedNumber},
  data() { return { countdownText: ''}},
  computed: {
    ...mapState(usePokerStore, ['table', 'joinedTable', 'round']),

  },
  mounted() {
    setInterval(this.handleCountdowns, 1000)
  },
  methods: {
    handleCountdowns() {
      this.countdownText = this.table && this.table.nextHandStart ? secondsUntil(this.table.nextHandStart) : -1
    },
    async goToLobby() {
      navigateToLobby()
      return this.$router.push({name: 'home'})
    },
  }
}
</script>
