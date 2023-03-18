<template>
    <div class="table-v2">
    <div class="table-stuff">
      <div class="pokerHand row flex-center">
      <PokerHand  />
      </div>
    <PokerPlayers/>
    </div>
    </div>
</template>

<script>
import PokerHand from "./PokerHand.vue"
import PokerPlayers from "components/PokerPlayers.vue";

export default {
  name: "PokerTable",
  components: {
    PokerPlayers,
    PokerHand,
  },
}
</script>

<style scoped>

.table-v2 {
  background: url("../assets/table-green.png") center center no-repeat;
  background-size: contain;
  width: 100vw;
  height: 100vh;
}

.table-stuff {
  width: 70%;
  height: 70%;
  position: relative;
  top: 10%;
  left: 15%;

}

.pokerHand {
  position: absolute;
  top: 40%;
  width: 100%;
  height: 100px;
}



</style>
