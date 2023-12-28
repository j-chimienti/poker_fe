<template>
  <q-btn push dense data-cy="logoutBtn" @click="logout" icon="logout" />
</template>

<script setup>
import { useAuthStore } from "stores/auth-store"

const logout = useAuthStore().logout()
</script>

<style scoped></style>
