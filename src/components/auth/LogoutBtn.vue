<template>
  <q-btn
    push
    dense
    data-cy="logoutBtn"
    @click="logout"
    icon="logout"
  >
  </q-btn>
</template>

<script>
import StoreMixin from "../../mixins/StoreMixin.vue"

export default {
  name: "LogoutBtn",
  mixins: [StoreMixin],
}
</script>

<style scoped></style>
