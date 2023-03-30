<template>
<q-list>
  <q-item v-for="table in rows" :key="table.title">
    <q-item-section>
      <div class="text-h6">{{table.title}}</div>
      <div class="text-secondary">
        {{table.playersCount}} players online
      </div>
    </q-item-section>
    <q-item-section>{{table.players}}</q-item-section>
    <q-item-section>{{table.stakes}}</q-item-section>
    <q-item-section>

      <div class="row justify-center">
        <q-btn size="lg" @click="joinTable(table.id)" label="join" push color="secondary"/>
      </div>

    </q-item-section>
  </q-item>
</q-list>

</template>

<script>
import {usePokerStore} from "stores/poker-store";
import {getTables, joinTable} from "src/services/apiService";
import {mapState} from "pinia";
import {formatToUSD} from "src/services/moneyUtils";

export default {
  methods: {
    joinTable(id) {

      return this.$router.push({name: 'table', params: {id}})
    }
  },
  computed: {
    ...mapState(usePokerStore, ['tables']),
    rows() {
      // todo: avg pot
      return this.tables.map(t => {
        const playersCount = Object.keys(t.pokerPlayers).length
        const name = `${t.title} ${playersCount} players online`
        const stakes = `${formatToUSD(t.config.bet.min)} / ${formatToUSD(t.config.bet.min * 2)}`
        const players = `${t.config.players.min} / ${t.config.players.max}`
        return Object.assign({}, t,{stakes, players, name, playersCount})
      })
    },
    columns() {
        return [
          { name: 'name', field: 'name', label: 'Name' },
          { name: 'stakes', field: 'stakes', label: 'Stakes',  },
          { name: 'players', field: 'players', label: 'Players' },
        ]
    }
  },
  mounted() {
    this.interval = setInterval(getTables, 5000)
  },
  unmounted() {
    clearInterval(this.interval)
  }
}
</script>

<style scoped>

</style>
