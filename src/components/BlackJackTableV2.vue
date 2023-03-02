<template>
  <div class="row justify-center table-wrapper" style="height: 90vh">
    <div class="table-v2">
      <div class="row flex justify-center player-hand-container">
        <BlackjackHand />
      </div>
    <PokerPlayers/>
  </div>
  </div>
</template>

<script>
import BlackjackHand from "./BlackjackHand.vue"
import StoreMixin from "src/mixins/StoreMixin.vue";
import PokerPlayers from "components/PokerPlayers.vue";

export default {
  name: "BlackJackTableV2",
  mixins: [StoreMixin],
  components: {
    PokerPlayers,
    BlackjackHand,
  },
}
</script>

<style scoped>
.table-wrapper {
  width: 100%;
}

.table-v2 {
  background: url("../assets/table-green.png") center center no-repeat;
  background-size: contain;
  margin-top: -100px;
  width: 100%;
}

.dealer-hand-container {
  margin-top: 300px;
}

.player-hand-container {
  height: 100px;
  margin-top: 100px;
}

@media all and (max-width: 500px) {
  .table-wrapper {
    width: 200vw;
    margin-left: -50vw;
  }
  .table-v2 {
    margin-top: 0;
  }

  .dealer-hand-container {
    margin-top: 200px;
  }
  .player-hand-container {
    margin-top: 25px;
  }
}
</style>
