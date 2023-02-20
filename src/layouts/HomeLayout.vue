<template>
  <q-layout view="hHh lpR fFf">
    <NavBar />
    <Drawer />
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer>
      <BottomNav3 v-if="authenticated"/>
    </q-footer>
  </q-layout>
</template>

<script>
import BottomNav3 from "../components/BottomNav3.vue"
import Drawer from "components/AppDrawer.vue"
import NavBar from "components/NavBar.vue"
import StoreMixin from "src/mixins/StoreMixin.vue"

export default {
  components: { NavBar, Drawer, BottomNav3 },
  mixins: [StoreMixin]
}
</script>
