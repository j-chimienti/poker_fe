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
       :card="card"
     />
  </TransitionGroup>
</template>

<script>
import PlayingCard from "./PlayingCard.vue"
import StoreMixin from "src/mixins/StoreMixin.vue";
import {usePokerStore} from "stores/poker-store";

export default {
  name: "BlackjackHand",
  computed: {
    cards() {
      return usePokerStore().table.cards
    }
  },
  components: { PlayingCard },
  methods: {
    beforeEnter(el) {
        el.style.opacity = 0
        el.style.transform = 'translate(-100px, -100vh)'
    },
    onEnter(el, done) {
      const delay = this.cards.length > 2 ? 0 : el.dataset.index * 1
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
      this.$gsap.to(el, {
        y: "-100vh",
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
