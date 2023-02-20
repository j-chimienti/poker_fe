<template>
  <q-btn
    push
    dense
    color="secondary"
    @click="loginModalVisible = true"
    label="login"
    data-cy="signupBtn"
  />
</template>

<script>
import StoreMixin from "../mixins/StoreMixin.vue"

export default {
  name: "SignupButton",
  mixins: [StoreMixin],
}
</script>

<style scoped></style>
