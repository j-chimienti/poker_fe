<template>
    <TexasHoldEmLobby/>
</template>

<script>
import {cardImages} from "../services/cardImageService"
import StoreMixin from "src/mixins/StoreMixin.vue"
import TexasHoldEmLobby from "components/TexasHoldEmLobby.vue";

export default {
  name: "GamePageV2",
  mixins: [StoreMixin],
  data() {
    return { cardImages }
  },
  components: {
    TexasHoldEmLobby,
  },
}
</script>

<style scoped>

</style>
