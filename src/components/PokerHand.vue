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

<script setup>
import { computed } from "vue"
import { usePokerStore } from "stores/poker-store"
import { range } from "lodash"
import gsap from "gsap"

const pokerStore = usePokerStore()
const cards = computed(() => pokerStore.cards)

const cardsAndHoles = computed(() => {
  return range(0, 5).map((idx) => {
    let card = null
    try {
      card = cards.value.length > idx ? cards.value[idx] : null
    } catch (e) {
      console.error("bad idx " + idx)
    }
    return { card, idx }
  })
})

const beforeEnter = (el) => {
  el.style.opacity = 0
  el.style.transform = "translate(-100px, -100px)"
}

const onEnter = (el, done) => {
  const delay = cards.value.length > 3 ? 0 : el.dataset.index * 1
  gsap.to(el, {
    y: 0,
    x: 0,
    opacity: 1,
    delay,
    duration: 0.8,
    onComplete: done,
  })
}

const onLeave = (el, done) => {
  gsap.to(el, {
    y: "-100px",
    opacity: 0,
    duration: 0.8,
    delay: 0,
    onComplete: done,
  })
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
