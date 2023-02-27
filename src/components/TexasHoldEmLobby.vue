<template>
<q-list>
  <q-item v-for="table in tables" :key="table">
    <q-btn  @click="$router.push({name: 'table', params: {id: table.id}})">
    <q-chip>{{table.title}}</q-chip>
    <q-chip>round:{{table.round}}</q-chip>
    <q-chip>hand:{{table.hand}}</q-chip>
    <q-chip>{{Object.keys(table.pokerPlayers).length}} players</q-chip>
    </q-btn>
  </q-item>
</q-list>
</template>

<script>
import {usePokerStore} from "stores/poker-store";
import {join} from "src/services/apiService";
import {mapState} from "pinia";

export default {
  computed: {
    ...mapState(usePokerStore, ['tables'])
  }
}
</script>

<style scoped>

</style>
