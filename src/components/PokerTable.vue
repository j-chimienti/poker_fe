<template>
    <div style="position: relative; width: 100%; height: 100%" >
    <div class="pokerHand row flex-center"><PokerHand/></div>
    <PokerPlayers/>
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


.pokerHand {
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  width: 100%;
  height: 100px;
}



</style>
