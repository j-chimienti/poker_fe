<template>
  <q-header elevated>
    <q-toolbar class="flex justify-between">
      <div class="flex justtify-center">
        <q-btn
          dense
          flat
          round
          icon="menu"
          data-cy="openDrawerBtn"
          @click="rightDrawerOpen = !rightDrawerOpen"
        />
        <img :src="logoSrc" style="width: 220px;" class="q-mr-lg" />
      </div>
    </q-toolbar>
  </q-header>
</template>
<script>
import StoreMixin from "../mixins/StoreMixin.vue"
import logoSrc from "../assets/bj-logo.png"

export default {
  name: "NavBar",
  data() {
    return {
      logoSrc,

    }
  },
  mixins: [StoreMixin],
}
</script>

<style>
.navbar-bj {
  background-size: cover;
  background: url("../assets/BottomNav.png") no-repeat;
}
</style>
