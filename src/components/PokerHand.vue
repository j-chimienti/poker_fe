<template>
  <TransitionGroup
    @enter="onEnter"
    @before-enter="beforeEnter"
    @leave="onLeave"
  >
    <div
      class="row flex-center"
      v-for="card in cardsAndHoles"
      :key="card.idx"
      :data-index="card.idx"
    >
      <q-img
        v-if="card.card"
        :src="card.card.image"
        width="122px"
        height="176px"
      />
      <div v-else class="hole-card"></div>
    </div>
  </TransitionGroup>
</template>

<script>
import PlayingCard from "./PlayingCard.vue"
import { usePokerStore } from "stores/poker-store"
import { mapState } from "pinia"
import { range } from "lodash"

export default {
  name: "PokerHand",
  computed: {
    ...mapState(usePokerStore, ["cards"]),
    cardsAndHoles() {
      const r = range(0, 5)
      return r.map((idx) => {
        let card = null
        try {
          card = this.cards.length >= idx ? this.cards[idx] : null
        } catch (e) {
          alert("bad idx " + idx)
        }
        return {
          card,
          idx,
        }
      })
    },
  },
  components: { PlayingCard },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0
      el.style.transform = "translate(-100px, -100px)"
    },
    onEnter(el, done) {
      const delay = this.cards.length > 3 ? 0 : el.dataset.index * 1
      this.$gsap.to(el, {
        y: 0,
        x: 0,
        opacity: 1,
        delay,
        duration: 0.8,
        onComplete: done,
      })
    },
    onLeave(el, done) {
      this.$gsap.to(el, {
        y: "-100px",
        opacity: 0,
        duration: 0.8,
        delay: 0,
        onComplete: done,
      })
    },
  },
}
</script>

<style scoped>
.hole-card {
  border: 7px solid #0d6757;
  border-radius: 8px;
  width: 122px;
  height: 176px;
}
</style>
