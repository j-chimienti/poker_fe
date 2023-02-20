<template>
  <q-dialog v-model="loginModalVisible">
    <Login />
  </q-dialog>
</template>

<script>
import Login from "./LoginForm.vue"
import DialogMixin from "../../mixins/DialogMixin.vue";

export default {
  name: "LoginModal",
  components: { Login },
  mixins: [DialogMixin]
}
</script>

<style scoped></style>
