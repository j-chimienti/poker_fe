<template>
  <TransitionGroup
    @enter="onEnter"
    @before-enter="beforeEnter"
    @leave="onLeave"
  >
       <PlayingCard
         v-for="(card, idx) in cards"
         :key="card.id"
         :data-index="idx"
         class="q-mx-sm"
         :card="card"
       />
        <div class="card-outline" v-for="card in cardsAndHoles" :key="card"></div>
  </TransitionGroup>
</template>

<script>
import PlayingCard from "./PlayingCard.vue"
import StoreMixin from "src/mixins/StoreMixin.vue";
import {usePokerStore} from "stores/poker-store";
import {mapState} from "pinia";

export default {
  name: "BlackjackHand",
  computed: {
    ...mapState(usePokerStore, ['cards']),
    cardsAndHoles() {
      const cards = this.cards;
        const holes = []
      if (cards.length < 5) {
        const items = 5 - cards.length
        for (let i = 1; i <= items; i++) {
          holes.push(i)
        }
      }
      return holes
    }
  },
  components: { PlayingCard },
  methods: {
    beforeEnter(el) {
        el.style.opacity = 0
        el.style.transform = 'translate(-100px, -100px)'
    },
    onEnter(el, done) {
      const delay = this.cards.length > 3 ? 0 : el.dataset.index * 1
      this.$gsap.to(el, {
        y: 0,
        x: 0,
        opacity: 1,
        delay,
        duration: 0.8,
        onComplete: done
      })
    },
    onLeave(el, done) {
      // todo: don't animate hole cards
      this.$gsap.to(el, {
        y: "-100px",
        opacity: 0,
        duration: 0.8,
        delay: 0,
        onComplete: done
      })
    }
  }
}
</script>

<style scoped></style>
