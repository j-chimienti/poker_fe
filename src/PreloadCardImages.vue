<template>
  <div hidden>
    <img
      v-for="card in cardImages"
      :key="card.name + 'loading'"
      width="75"
      :src="card.image"
    />
  </div>
</template>
<script setup>
import { cardImages } from "./services/cardImageService.js"
</script>
