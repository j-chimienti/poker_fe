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
      <TableInfo/>
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
  data() {
    return {

    }
  },
  mixins: [StoreMixin],
}
</script>

<style>

</style>
