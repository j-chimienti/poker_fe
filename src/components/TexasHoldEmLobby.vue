<template>
<q-list>
  <q-item v-for="table in tables" :key="table" >
    players={{Object.keys(table.pokerPlayers).length}}
    <q-btn @click="$router.push({name: 'table', params: {id: table.id}})" :label="table.title"/>

    {{table}}
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
