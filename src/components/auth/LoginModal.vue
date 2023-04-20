<template>
<q-dialog v-model="loginModalVisible" persistent full-height full-width>
<LoginForm/>
</q-dialog>
</template>

<script>
import DialogMixin from "src/mixins/DialogMixin.vue";
import LoginForm from "components/auth/LoginForm.vue";

export default {
  name: "LoginModal",
  components: {LoginForm},
  mixins: [DialogMixin]
}
</script>

<style scoped>

</style>
