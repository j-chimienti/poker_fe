<template>
  <div>
    <div v-if="dealerCards" class="row justify-start full-width">
      <TransitionGroup @enter="onEnter">
        <PlayingCard
          v-for="(card, index) in dealerCards"
          :key="card.id + index"
          :data-index="index"
          :card="card"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import PlayingCard from "./PlayingCard.vue"
import StoreMixin from "src/mixins/StoreMixin.vue"

export default {
  name: "DealerHand",
  components: { PlayingCard },
  mixins: [StoreMixin],
  methods: {
    onEnter(el, done) {
      let delay = el.dataset.index
      if (this.dealerCards.length > 2) {
        delay = el.dataset.index - 2
      }
      this.$gsap.from(el, {
        x: "-100vw",
        delay,
        onComplete: done
      })
    }
  },
}
</script>

<style scoped>

</style>
