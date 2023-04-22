<template>
  <div v-for="spot in tablePositions" :key="spot.position" :class="getKlass(spot)">
    <div v-if="spot.playerAccountId">
      <PokerPlayer  :player="spot"/>
    </div>
    <div v-else>
        <q-btn
          label="join"
          class="join-btn"
          v-if="!joinedTable"
          @click="joinTable(tableId, spot.position)"   />
        <q-img v-else src="../assets/logo-icon-dark.png" width="50px"/>
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
    ...mapState(usePokerStore, [ 'joinedTable', 'pokerPlayerById' ,'pokerPlayers', 'playerTurn', 'pokerPlayersByPosition', 'tablePositions']),
    ...mapState(useAuthStore, ['playerId']),
  },
  methods: {
    getKlass(spot) {
      const arr = ['player-avatar', 'object' + spot.position, 'row', 'flex-center']
      if (this.isActive(spot)) return arr.concat(['active'])
      return arr
    },
    isActive(spot) {
      const pid = this.$get(spot, 'playerAccountId', null)
      return pid === this.playerTurn
    }
  }
}
</script>
<style lang="scss">
.player-avatar {
  background-image: url(src/assets/join-disk.png);
  background-size: contain;
  width: 129px;
  height: 129px;
 &.active {
   border: 6px solid $mango_orange;
   border-radius: 100%;
 }
}


</style>
