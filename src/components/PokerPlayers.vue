<template>
  <div v-for="spot in tablePositions" :key="spot.position">
    <PokerPlayer v-if="spot.playerAccountId" :player="spot"/>
    <div v-else :class="'player-avatar object' + spot.position">
      <q-btn
        label="join"
            class="join-btn"
             :disable="joinedTable"
             @click="joinTable(tableId, spot.position)"   />
    </div>
  </div>
</template>

<script>
import {mapState} from "pinia";
import {usePokerStore} from "stores/poker-store";
import {useAuthStore} from "stores/auth-store";
import PokerPlayer from "components/PokerPlayer.vue";
import RouterMixin from "src/mixins/RouterMixin.vue";
import ApiMixin from "src/mixins/ApiMixin.vue";
import playerSpot from 'src/assets/player-spot.png'

export default {
  name: "PokerPlayers",
  components: {PokerPlayer},
  data() { return { playerSpot}},
  mixins: [RouterMixin, ApiMixin],
  computed: {
    ...mapState(usePokerStore, [ 'joinedTable' ,'pokerPlayers', 'playerTurn', 'pokerPlayersByPosition', 'tablePositions']),
    ...mapState(useAuthStore, ['playerId']),

  }
}
</script>
<style lang="scss">
.player-avatar {
  background-image: url(src/assets/player-spot.png);
  background-size: contain;
  width: 100px;
  height: 100px;
}

.active {

  width: 163px;
  height: 163px;
  border-radius: 163px;

  /* Mango Orange */

  background: #FF7A41;
  /* Cartoon Shadow */

  box-shadow: -3px 3px 0px 1px rgba(0, 0, 0, 0.25);
}
</style>
