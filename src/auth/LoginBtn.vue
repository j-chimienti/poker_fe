<template>
  <q-btn
    data-cy="loginBtn"
    icon="login"
    dense
    @click="loginModalVisible = true"
    color="primary"
  />
</template>

<script>
import StoreMixin from "src/mixins/StoreMixin.vue"

export default {
  name: "LoginBtn",
  mixins: [StoreMixin],
}
</script>

<style scoped></style>
