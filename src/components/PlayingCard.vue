<template>
  <q-img :src="card.image" width="122px" height="176px" />
</template>

<script setup>
import { defineProps } from "vue"

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
  imgWidth: {
    type: String,
    default: "122px",
  },
  imgHeight: {
    type: String,
    default: "176px",
  },
})
</script>
