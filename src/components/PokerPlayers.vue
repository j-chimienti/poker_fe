<template>
  <div v-for="spot in tablePositions" :key="spot.position">
    <PokerPlayer v-if="spot.playerAccountId" :player="spot"/>

    <div v-else :class="getKlass(spot)" >
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
import {mapActions, mapState} from "pinia";
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
    getBackground(spot) {
      const a = ['player-avatar', 'object' + spot.position, 'row', 'flex-center']
      if (this.joinedTable) return a
      return a
    },


  },
  methods: {
    getKlass(spot) {
      const player = this.pokerPlayerById(this.playerTurn)
      const arr = ['player-avatar', 'object' + spot.position, 'row', 'flex-center']
      const pos = this.$get(player, 'position', -2)
      const p = this.$get(spot, 'position', -1)
      if (pos !== p) return arr
      return arr.concat(['active'])
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
   background: red;
 }
}


</style>
