<template>
  <div v-for="position in tablePositions" :key="position">
    <PokerPlayer v-if="position && position.playerAccountId" :player="position"/>
    <div v-else :class="'object' + position">
      <q-btn color="accent" size="lg"
             :disable="joinedTable"
             @click="joinTable(tableId, position)" icon="add" push rounded :label="position"/>
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

