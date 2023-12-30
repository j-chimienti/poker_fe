<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
      <LoginModal />
      <AccountInfoModal />
      <PreloadCardImages />
    </q-page-container>
  </q-layout>
</template>

<style></style>
<script setup>
import LoginModal from "src/auth/LoginModal.vue"
import PreloadCardImages from "src/PreloadCardImages.vue"
import AccountInfoModal from "components/dialogs/AccountInfoModal.vue"
</script>
