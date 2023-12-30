<template>
  <div class="poker-table">
    <div style="position: relative; width: 100%; height: 100%">
      <div v-if="round !== rounds.WAITING" class="table-round">
        {{ round }}
      </div>
      <div
        v-for="player in seats"
        :key="player.position + player.playerAccountId + table.id"
      >
        <PokerPlayerCards v-if="player.playerAccountId" :player="player" />
      </div>
      <div class="pokerHand row flex-center"><TableCommunityCards /></div>
      <div v-for="spot in seats" :key="spot.position">
        <PokerPlayer :player="spot" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import TableCommunityCards from "./TableCommunityCards.vue"
import PokerPlayerCards from "components/PokerPlayerCards.vue"
import { usePokerStore } from "stores/poker-store"
import { rounds } from "src/constants"
import PokerPlayer from "components/PokerPlayer.vue"
import OpenSeat from "components/OpenSeat.vue"

const seats = computed(() => pokerStore.seats)
const pokerStore = usePokerStore()
const round = computed(() => pokerStore.round)
const pokerPlayers = computed(() => pokerStore.pokerPlayers)
const table = computed(() => pokerStore.table)
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
