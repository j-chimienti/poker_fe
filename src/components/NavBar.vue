<template>
  <q-header class="bg-transparent">
    <q-toolbar class="flex justify-between">
        <div class="flex justify-start">
          <q-btn
            dense
            flat
            round
            icon="menu"
            data-cy="openDrawerBtn"
            @click="rightDrawerOpen = !rightDrawerOpen"
          />
          <div class="text-h3">Poker</div>
        </div>
      <TableInfo v-if="showTable"/>
      <div v-else class="text-h2"></div>
      <div></div>
    </q-toolbar>
  </q-header>
</template>
<script>
import StoreMixin from "../mixins/StoreMixin.vue"
import TableInfo from "pages/TableInfo.vue";

export default {
  name: "NavBar",
  components: {TableInfo},
 computed: {
   showTable() {
     return this.$route.name === "table"
   }
 },
  mixins: [StoreMixin],
}
</script>

<style>

</style>
