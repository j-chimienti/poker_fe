<template>
  <div>
    <LoginModal />
    <AccountInfoModal />
    <div hidden>
      <img
        v-for="card in cardImages"
        :key="card.name + 'loading'"
        width="75"
        :src="card.image"
      />
    </div>
    <router-view />
  </div>
</template>

<script setup>
import { cardImages } from "./services/cardImageService.js"
import LoginModal from "components/auth/LoginModal.vue"
import AccountInfoModal from "components/dialogs/AccountInfoModal.vue"
</script>
