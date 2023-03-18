<template>
  <div class="row justify-center">
    <q-btn @click="navigateToLobby" label="lobby" icon="arrow_left" color="secondary"/>
    <div>
      <div>
        <q-chip>{{table.title}}</q-chip>
        <q-chip>{{table.round}}</q-chip>
        <q-chip>hand:{{table.hand}}</q-chip>
        <q-chip>pot:{{table.pot}}</q-chip>
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

export default {
  name: 'TableInfo',
  props: {
    countdownText: {},
  },
  computed: {
    ...mapState(usePokerStore, ['table', 'joinedTable', 'round'])
  },
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
  }
}
</script>
