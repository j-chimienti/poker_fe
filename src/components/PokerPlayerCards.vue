<template>
  <div :class="'object' + player.position + ' pokercards'">
    <div style="position: relative" v-if="showCards.length">
      <q-img
        v-for="(card, idx) in getCards"
        :src="card.image"
        :class="getStyle(idx, card)"
        :key="card.id"
        width="61px"
        height="88px"
      />
    </div>
    <div v-else-if="cards.length">
      <q-img src="../assets/down-cards.png" width="75px" />
    </div>
  </div>
</template>
<script>
import { get } from "lodash"

export default {
  name: "PokerPlayerCards",

  methods: {
    getStyle(i) {
      return i === 1 ? "right-child" : "left-child"
    },
  },
  computed: {
    showCards() {
      return get(this.player, "showCards", [])
    },
    cards() {
      return get(this.player, "cards", [])
    },
    getCards() {
      return this.showCards.length
        ? this.showCards
        : this.cards.length
        ? this.cards
        : []
    },
  },

  props: {
    player: {},
  },
}
</script>
<style>
.left-child {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}

.right-child {
  position: absolute;
  left: 15px;
  top: 15px;
  z-index: 2;
}
</style>
