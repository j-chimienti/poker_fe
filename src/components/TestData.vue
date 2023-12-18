<template>
  <div hidden v-if="connectedToWebsocket" data-cy="connectedToWebsocket">
    {{ connectedToWebsocket }}
  </div>
  <div hidden data-cy="email">{{ email }}</div>
</template>
<script>
import { mapState } from "pinia"
import { useAuthStore } from "stores/auth-store"

export default {
  name: "TestData",
  computed: {
    ...mapState(useAuthStore, ["connectedToWebsocket", "email"]),
  },
}
</script>
