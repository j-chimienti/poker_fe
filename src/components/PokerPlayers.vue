<template>
<div>
  <div class="row flex-center" >
    <PokerPlayer v-for="player in pokerPlayersByPosition" :player="player" :key="player.position"/>
  </div>
</div>
</template>

<script>
import {mapState} from "pinia";
import {usePokerStore} from "stores/poker-store";
import {useAuthStore} from "stores/auth-store";
import PokerPlayer from "components/PokerPlayer.vue";

export default {
  name: "PokerPlayers",
  components: {PokerPlayer},
  computed: {
    ...mapState(usePokerStore, ['pokerPlayers', 'playerTurn', 'pokerPlayersByPosition']),
    ...mapState(useAuthStore, ['playerId']),

  }
}
</script>

