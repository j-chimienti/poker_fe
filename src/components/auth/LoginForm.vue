<template>
  <q-card class="q-px-lg">
    <div class="login-header text-center">{{ loginType }}</div>
    <SocialAuth />
    <div class="row flex-center">
      <q-form
        dark
        @submit.prevent="onSubmitForm"
        class="q-my-lg text-center text-white"
        ref="loginForm"
        data-cy="loginForm"
        style="max-width: 700px"
      >
        <div class="email-text">Email</div>
        <q-input type="email" v-model="email" lazy-rules :rules="[emailRule]" />
        <q-input
          :type="passwordVisible ? 'text' : 'password'"
          name="password"
          class="text-white"
          data-cy="password"
          v-model="password"
          lazy-rules
          label="password"
          :rules="[passwordRule]"
        >
          <template v-slot:append>
            <q-icon
              :name="passwordVisible ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="passwordVisible = !passwordVisible"
            />
          </template>
        </q-input>
        <q-input
          v-if="loginType === 'signup'"
          type="password"
          name="passwordVerify"
          data-cy="passwordVerify"
          v-model="passwordVerify"
          label="password"
          lazy-rules
          :rules="[passwordVerifyRule]"
        >
          <template v-slot:append>
            <q-icon
              :name="passwordVisibleVerify ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="passwordVisibleVerify = !passwordVisibleVerify"
            />
          </template>
        </q-input>

        <q-btn
          type="submit"
          :label="loginType"
          class="submit-login-btn"
          :loading="loadingLogin"
        />

        <div class="q-mt-md pointer switch-login-type-text">
          <p @click="loginType = 'login'" v-if="loginType === 'signup'">
            Already have an account? sign in
          </p>
          <p @click="loginType = 'signup'" v-else data-cy="goToSignup">
            Don't have an account? sign up
          </p>
        </div>
      </q-form>
    </div>
  </q-card>
</template>

<script setup>
import { ref } from "vue"
import SocialAuth from "./SocialAuth.vue"
import { useQuasar } from "quasar"
import { useAuthStore } from "stores/auth-store"

const $q = useQuasar()

// Reactive states
const email = ref("")
const password = ref("")
const passwordVerify = ref("")
const loginType = ref("login")
const passwordVisible = ref(false)
const passwordVisibleVerify = ref(false)
const loadingLogin = ref(false)

// Validation rules
const emailRule = (val) => /\S+@\S+\.\S+/.test(val) || "Invalid email"
const passwordRule = (val) =>
  (val && val.length >= 8) || "Password must be more than 8 characters"
const passwordVerifyRule = (val) =>
  loginType.value === "signup"
    ? val === password.value || "Password verification failed"
    : true

const onSubmitForm = async () => {
  loadingLogin.value = true
  try {
    if (loginType.value === "signup") {
      await useAuthStore().signup({
        email: email.value,
        password: password.value,
      })
      // Handle successful signup
    } else {
      await useAuthStore().login({
        email: email.value,
        password: password.value,
      })
      // Handle successful login
      $q.notify("logged in " + email.value)
    }
  } catch (error) {
    $q.notify({
      message: "Invalid request",
      type: "negative",
    })
  } finally {
    loadingLogin.value = false
  }
}
</script>

<style lang="scss" scoped>
input,
label {
  color: white !important;
}

svg {
  cursor: pointer;
}

.submit-login-btn {
  width: 336px;
  height: 48px;

  /* Mango Orange */

  background: #ff7a41;
  box-shadow: -3px 3px 0px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.login-header {
  font-family: "Wonderbar";
  font-style: normal;
  font-weight: 400;
  font-size: 78px;
  line-height: 100px;
  /* identical to box height, or 128% */

  color: #ffffff;
}

.email-text {
  font-family: "Mukta";
  font-style: normal;
  font-weight: 800;
  font-size: 32px;
  line-height: 36px;
  /* identical to box height, or 112% */
  color: #ffffff;
}

.switch-login-type-text {
  font-family: "Mukta";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  /* identical to box height, or 117% */

  text-align: center;

  color: #ffffff;
}
</style>
