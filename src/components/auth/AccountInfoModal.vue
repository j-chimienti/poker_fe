<template>
  <q-dialog v-model="accountModalVisible">
    <div class="bg-primary account-popup">
      <q-img class="cursor-pointer" src="src/assets/close-icon.png" width="56px" height="56px" v-close-popup/>
      <div>
        <div class="text-h3 text-center">account</div>
        <div class="row flex-center">
          <div class="q-mr-sm">{{ avatar }}</div>
          <div class="q-ml-sm">{{ name }}</div>
        </div>
        <div class="row justify-center q-my-md">
          <q-btn @click="accountModalVisible = false;loginModalVisible = true" class="login-btn" label="login"></q-btn>
        </div>
        <div class="row justify-center q-my-md">
          <q-btn @click="accountModalVisible = false;loginModalVisible = true" class="login-btn" label="signup"></q-btn>
        </div>
      </div>
    </div>
  </q-dialog>
</template>

<script>
import Login from "./LoginForm.vue"
import DialogMixin from "../../mixins/DialogMixin.vue";
import {mapState} from "pinia";
import {useAuthStore} from "stores/auth-store";
import LoginForm from "components/auth/LoginForm.vue";

export default {
  name: "AccountInfoModal",
  components: {LoginForm, Login },
  data() {
    return { loginFormVisible: false }
  },
  computed: {
    ...mapState(useAuthStore, ['name', 'avatar'])
  },
  mixins: [DialogMixin]
}
</script>

<style scoped>

.account-popup {
  width: 446px;
  height: 351px;

  /* Box Shadows / Dark */

  box-shadow: 0px 0px 22px 5px rgba(0, 0, 0, 0.5);
  border-radius: 22px;
}
.login-btn {
  width: 338px;
  height: 48px;
  /* Mango Orange */

  background: #FF7A41;
  box-shadow: -3px 3px 0px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
</style>
