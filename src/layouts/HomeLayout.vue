<template>
  <q-layout view="hHh lpR fFf">
    <NavBar />
    <Drawer />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Drawer from "components/AppDrawer.vue"
import NavBar from "components/NavBar.vue"
import StoreMixin from "src/mixins/StoreMixin.vue"

export default {
  components: { NavBar, Drawer },
  mixins: [StoreMixin]
}
</script>
