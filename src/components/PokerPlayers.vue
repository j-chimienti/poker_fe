<template>
  <div v-for="spot in tablePositions" :key="spot.position">
    <PokerPlayer v-if="spot.playerAccountId" :player="spot"/>
    <div v-else :class="'object' + spot.position">
      <q-btn color="accent" size="lg"
             :disable="joinedTable"
             @click="joinTable(tableId, spot.position)" icon="add" push rounded />
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

export default {
  name: "PokerPlayers",
  components: {PokerPlayer},
  mixins: [RouterMixin, ApiMixin],
  computed: {
    ...mapState(usePokerStore, [ 'joinedTable' ,'pokerPlayers', 'playerTurn', 'pokerPlayersByPosition', 'tablePositions']),
    ...mapState(useAuthStore, ['playerId']),

  }
}
</script>

