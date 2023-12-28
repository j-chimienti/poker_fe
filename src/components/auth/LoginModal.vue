<template>
  <q-dialog v-model="loginModalVisible">
    <LoginForm />
  </q-dialog>
</template>

<script setup>
import LoginForm from "components/auth/LoginForm.vue"
import { computed } from "vue"
import { useUiStore } from "stores/ui-store"

const uiStore = useUiStore()

const loginModalVisible = computed({
  get: () => uiStore.loginModalVisible,
  set: (value) => (uiStore.loginModalVisible = value),
})
</script>

<style scoped></style>
