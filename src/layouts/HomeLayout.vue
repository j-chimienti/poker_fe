<template>
  <q-layout view="hHh lpR fFf">
    <NavBar />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Drawer from "components/AppDrawer.vue"
import NavBar from "components/NavBar.vue"

export default {
  components: { NavBar, Drawer },
}
</script>
