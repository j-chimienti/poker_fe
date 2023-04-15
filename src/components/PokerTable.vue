<template>
  <div class="poker-table">
    <div style="position: relative; width: 100%; height: 100%">
        <div v-for="player in tablePositions" :key="player.position + player.playerAccountId + table.id">
          <PokerPlayerCards :player="player"/>
        </div>
    <div class="pokerHand row flex-center"><PokerHand/></div>
    <PokerPlayers/>
    </div>
  </div>
</template>

<script>
import PokerHand from "./PokerHand.vue"
import PokerPlayers from "components/PokerPlayers.vue";
import PokerPlayerCards from "components/PokerPlayerCards.vue";
import {mapState} from "pinia";
import {usePokerStore} from "stores/poker-store";

export default {
  name: "PokerTable",
  computed: {
    ...mapState(usePokerStore, ['pokerPlayers','table', 'playerTurn', 'tablePositions']),
  },
  components: {
    PokerPlayers,
    PokerPlayerCards,
    PokerHand,
  },
}
</script>

<style scoped>

.poker-table {
  background: url("../assets/poker-table.png") center center no-repeat;
  background-size: contain;
  width: 1080px;
  height: 520px;
}

.pokerHand {
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  width: 100%;
  height: 100px;
}



</style>
