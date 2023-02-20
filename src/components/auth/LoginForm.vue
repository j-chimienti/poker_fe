<template>
  <q-card class="q-px-lg" dark>
    <SocialAuth />
    <q-form
      @submit.prevent="onSubmitForm"
      class="q-my-lg text-center"
      ref="loginForm"
      data-cy="loginForm"
    >
      <q-input
        type="email"
        placeholder="email"
        v-model="email"
        lazy-rules
        :rules="[(val) => emailIsValid(val) || 'Invalid email']"
      />
      <q-input
        :type="passwordVisible ? 'text' : 'password'"
        name="password"
        placeholder="Password"
        data-cy="password"
        v-model="password"
        lazy-rules
        label="password"
        :rules="[
          (val) =>
            (val && val.length >= 8) ||
            'Password must be more than 8 characters',
        ]"
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
        placeholder="Verify Password"
        v-model="passwordVerify"
        label="password"
        lazy-rules
        :rules="[
          (val) =>
            (loginType === 'signup' ? val === password : true) ||
            'Password verification failed',
        ]"
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
        color="primary"
        :loading="loadingLogin"
      />

      <div class="q-mt-md pointer">
        <p @click="loginType = 'login'" v-if="loginType === 'signup'">
          Already have an account? sign in
        </p>
        <p @click="loginType = 'signup'" v-else data-cy="goToSignup">
          Don't have an account? sign up
        </p>
      </div>
    </q-form>
  </q-card>
</template>

<script>
import SocialAuth from "./SocialAuth.vue"
import StoreMixin from "src/mixins/StoreMixin.vue"
import DialogMixin from "src/mixins/DialogMixin.vue";

export default {
  name: "LoginForm",
  components: { SocialAuth },
  data() {
    return {
      password: "",
      loginType: "login",
      email: "",
      passwordVerify: "",
      passwordVisible: false,
      passwordVisibleVerify: false,
    }
  },
  mixins: [StoreMixin, DialogMixin],

  methods: {
     emailIsValid(email) {
  return /\S+@\S+\.\S+/.test(email)
},
    onSubmitForm() {
      const { password, email, loginType } = this
      this.$refs.loginForm.validate().then((success) => {
        if (success) {
          this.loadingLogin = true
          if (loginType === "signup")
            return this.signup({ password, email })
              .then(f => {
                this.loginModalVisible = false
              })

          else
            return this.login({ password, email })
              .then(f => {
                this.loginModalVisible = false
                this.$q.notify("logged in " + email)
              })

        } else {
          this.loadingLogin = false
          this.$q.notify({
            message: "Invalid request",
            type: "negative",
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.signup-link {
  border-bottom: 4px solid transparent;
  transition: all 0.1s ease-in-out;
  font-size: 1.75rem;
  cursor: pointer;
}
.signup-link:hover {
  border-bottom: 4px solid green;
}

.active {
  border-bottom: 4px solid green;
}
.loginCard {
  width: 400px;
  border: 0.5rem solid #8e1116;
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
</style>
