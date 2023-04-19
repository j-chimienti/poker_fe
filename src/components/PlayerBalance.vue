<template>
  <div class="player-balance">
    <q-img src="../assets/balance.png" width="155px" height="155px" />
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
      {{balance}}
    </div>
  </div>
</template>

<script>
import {mapState} from "pinia";
import {usePokerStore} from "stores/poker-store";

export default {
  name: "PlayerBalance",
  computed: {
    ...mapState(usePokerStore, ['balance'])
  }
}
</script>

<style scoped>
.player-balance {
  position: fixed;
  display: inline-block;
  bottom: 0;
  right: 10px;
}
</style>
