<template>
    <BlackJackTableV2 />
</template>

<script>
import {cardImages} from "../services/cardImageService"
import BlackJackTableV2 from "components/BlackJackTableV2.vue"
import StoreMixin from "src/mixins/StoreMixin.vue"

export default {
  name: "GamePageV2",
  mixins: [StoreMixin],
  data() {
    return { cardImages }
  },
  components: {
    BlackJackTableV2,
  },
}
</script>

<style scoped>

</style>
