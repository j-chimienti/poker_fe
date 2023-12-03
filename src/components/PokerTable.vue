<template>
  <div class="poker-table">
    <div style="position: relative; width: 100%; height: 100%">
      <div v-if="table.round !== 'WAITING'" class="table-round">
        {{ table.round }}
      </div>
      <div
        v-for="player in tablePositions"
        :key="player.position + player.playerAccountId + table.id"
      >
        <PokerPlayerCards :player="player" />
      </div>
      <div class="pokerHand row flex-center"><PokerHand /></div>
      <PokerPlayers />
    </div>
  </div>
</template>

<script>
import PokerHand from "./PokerHand.vue"
import PokerPlayers from "components/PokerPlayers.vue"
import PokerPlayerCards from "components/PokerPlayerCards.vue"
import { mapState } from "pinia"
import { usePokerStore } from "stores/poker-store"
import MyCards from "components/MyCards.vue"
import TableMaxBet from "components/TableMaxBet.vue"

export default {
  name: "PokerTable",
  computed: {
    ...mapState(usePokerStore, [
      "playerTurnId",
      "pokerPlayers",
      "table",
      "playerTurn",
      "tablePositions",
      "playerIsMe",
    ]),
  },
  components: {
    TableMaxBet,
    MyCards,
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

.table-round {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 25%;
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 18px;
}
</style>
