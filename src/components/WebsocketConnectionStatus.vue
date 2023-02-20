<template>
  <q-icon
    name="check_circle"
    :class="{
      'text-green': connectedToWebsocket,
      'text-red': !connectedToWebsocket,
    }"
  >
  </q-icon>
</template>

<script>
import { mapState } from "pinia"
import { useAuthStore } from "stores/auth-store"

export default {
  name: "WebsocketConnectionStatus",
  computed: {
    ...mapState(useAuthStore, ["connectedToWebsocket"]),
  },
}
</script>

<style scoped></style>
