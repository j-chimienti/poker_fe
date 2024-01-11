<template>
  <q-card class="q-px-lg loginCard">
    <q-card-section class="row flex-center">
      <q-btn flat round dense icon="close" class="close-button" v-close-popup />
      <div class="text-h3">{{ loginType }}</div>
    </q-card-section>
    <SocialAuth />
    <q-form
      ref="loginForm"
      class="q-my-lg text-center"
      data-cy="loginForm"
      @submit.prevent="onSubmitForm"
    >
      <q-input
        v-model="form.email"
        type="email"
        placeholder="email"
        lazy-rules
        :rules="[(val) => emailIsValid(val) || 'Invalid email']"
      />
      <q-input
        v-model="form.password"
        :type="passwordVisible ? 'text' : 'password'"
        name="password"
        placeholder="Password"
        data-cy="password"
        lazy-rules
        label="password"
        :rules="[
          (val) =>
            (val && val.length >= 8) ||
            'Password must be more than 8 characters',
        ]"
      >
        <template #append>
          <q-icon
            :name="passwordVisible ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="passwordVisible = !passwordVisible"
          />
        </template>
      </q-input>
      <div class="fixed-height-input">
        <q-input
          v-if="loginType === 'signup'"
          v-model="form.passwordVerify"
          type="password"
          name="passwordVerify"
          data-cy="passwordVerify"
          placeholder="Verify Password"
          label="password"
          lazy-rules
          :rules="[
            (val) =>
              (loginType === 'signup' ? val === form.password : true) ||
              'Password verification failed',
          ]"
        >
          <template #append>
            <q-icon
              :name="passwordVisibleVerify ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="passwordVisibleVerify = !passwordVisibleVerify"
            />
          </template>
        </q-input>
        <div v-else class="input-placeholder"></div>
      </div>

      <q-btn
        type="submit"
        :label="loginType"
        icon="login"
        color="primary"
        :loading="loadingLogin"
        class="auth-btn"
      />

      <div class="q-mt-md pointer">
        <p v-if="loginType === 'signup'" @click="loginType = 'login'">
          Already have an account? sign in
        </p>
        <p v-else data-cy="goToSignup" @click="loginType = 'signup'">
          Don't have an account? sign up
        </p>
      </div>
    </q-form>
  </q-card>
</template>

<script setup>
import SocialAuth from "./SocialAuth.vue"
import { useAuthStore } from "src/auth/auth-store"
import { computed, ref } from "vue"
import { useQuasar } from "quasar"

const $q = useQuasar()

const loginForm = ref(null)

const form = ref({
  password: "",
  email: "",
  passwordVerify: "",
})

const loginType = ref("login")
const loadingLogin = ref(false)
const passwordVisible = ref(false)
const passwordVisibleVerify = ref(false)

const loginModalVisible = computed({
  get: () => useAuthStore().loginModalVisible,
  set: (v) => (useAuthStore().loginModalVisible = v),
})

const emailIsValid = (email) => /\S+@\S+\.\S+/.test(email)

const onSubmitForm = () => {
  const { password, email } = form.value

  loginForm.value.validate().then((success) => {
    if (success) {
      loadingLogin.value = true
      if (loginType.value === "signup")
        return useAuthStore()
          .signup({ password, email })
          .then((f) => (loginModalVisible.value = false))
          .finally(() => {
            loadingLogin.value = false
          })
      else
        return useAuthStore()
          .login({ password, email })
          .then((f) => {
            if (f) loginModalVisible.value = false
            loadingLogin.value = false
          })
    } else {
      loadingLogin.value = false
      $q.notify({
        message: "Invalid request",
        type: "negative",
      })
    }
  })
}
</script>

<style lang="scss" scoped>
@import "../css/quasar.variables";
.signup-link {
  border-bottom: 4px solid transparent;
  transition: all 0.1s ease-in-out;
  font-size: 1.75rem;
  cursor: pointer;
}
.signup-link:hover {
  border-bottom: 4px solid $primary;
}

.active {
  border-bottom: 4px solid $primary;
}
.loginCard {
  width: 400px;
  border: 0.5rem solid $primary;
}

input,
label {
  color: white !important;
  font-size: 1.25rem;
}

svg {
  cursor: pointer;
}

.login-btn {
  width: 150px;
}

.fixed-height-input {
  height: 5rem; // Set this to the height of your q-input
  overflow: hidden;
}

.input-placeholder {
  height: 100%;
  visibility: hidden;
}

.auth-btn {
  width: 200px;
}
</style>
