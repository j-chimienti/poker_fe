<template>
  <div v-for="spot in tablePositions" :key="spot.position">
      <PokerPlayer  :player="spot"/>
  </div>
</template>

<script>
import {mapState} from "pinia";
import {usePokerStore} from "stores/poker-store";
import {useAuthStore} from "stores/auth-store";
import PokerPlayer from "components/PokerPlayer.vue";
import RouterMixin from "src/mixins/RouterMixin.vue";
import ApiMixin from "src/mixins/ApiMixin.vue";

export default {
  name: "PokerPlayers",
  components: {PokerPlayer},
  mixins: [RouterMixin, ApiMixin],
  computed: {
    ...mapState(usePokerStore, [ 'tablePositions']),
  },

}
</script>
<style lang="scss">



</style>
