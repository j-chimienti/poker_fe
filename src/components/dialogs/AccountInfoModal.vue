<template>
  <q-dialog v-model="accountModalVisible">
    <q-card>
      <q-card-section>
        <q-img
          class="cursor-pointer"
          src="src/assets/close-icon.png"
          width="56px"
          height="56px"
          v-close-popup
        />
      </q-card-section>
      <q-card-section>
        <div class="text-h3 text-center">account</div>
        <div class="row flex-center">
          <div class="q-mr-sm">{{ avatar }}</div>
          <div class="q-ml-sm">{{ name }}</div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-btn @click="onClick" class="login-btn" label="login"></q-btn>
      </q-card-section>
      <q-card-section>
        <q-btn @click="onClick" class="login-btn" label="signup"></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from "vue"
import { useUiStore } from "stores/ui-store"
import { useAuthStore } from "stores/auth-store"

const uiStore = useUiStore()
const authStore = useAuthStore()

const accountModalVisible = computed({
  get: () => uiStore.accountModalVisible,
  set: (value) => (uiStore.accountModalVisible = value),
})

const onClick = () => {
  uiStore.toggleModal("accountModalVisible", false)
  uiStore.toggleModal("loginModalVisible", true)
}

const name = computed(() => authStore.name)
const avatar = computed(() => authStore.avatar)
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

  background: #ff7a41;
  box-shadow: -3px 3px 0px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
</style>
