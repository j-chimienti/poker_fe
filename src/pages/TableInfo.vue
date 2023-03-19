<template>
  <div class="row justify-center">
    <q-btn @click="navigateToLobby" label="lobby" icon="arrow_left" color="secondary"/>
    <div>
      <div>
        <q-chip>{{table.title}}</q-chip>
        <q-chip>{{table.round}}</q-chip>
        <q-chip>hand:<TweenedNumber :balance="table.hand" /></q-chip>
        <q-chip>pot: <TweenedNumber :balance="table.pot" /></q-chip>
        <q-chip v-if="countdownText > 0" color="orange">
          <div>next game starts: {{countdownText}}s</div>
        </q-chip>
      </div>
    </div>
  </div>
</template>
<script>
import {leave} from "src/services/apiService";
import {mapState} from "pinia";
import {usePokerStore} from "stores/poker-store";
import {secondsUntil} from "src/services/dateService";
import TweenedNumber from "components/TweenedNumber";

export default {
  name: 'TableInfo',
  components: {TweenedNumber},
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
    async navigateToLobby() {
      if (this.table) {
        try {
          leave(this.table.id)
        } catch (e) {
        }
      }
      return this.$router.push({name: 'home'})
    },
  }
}
</script>
