<template>
  <div v-for="spot in seats" :key="spot.position">
    <PokerPlayer :player="spot" />
  </div>
</template>

<script>
import { mapState } from "pinia"
import { usePokerStore } from "stores/poker-store"
import PokerPlayer from "components/PokerPlayer.vue"

export default {
  name: "PokerPlayers",
  components: { PokerPlayer },
  computed: {
    ...mapState(usePokerStore, ["seats"]),
  },
}
</script>
<style lang="scss"></style>
