<template>
  <div class="my-cards">
    <transition-group
      @enter="onEnter"
      @before-enter="beforeEnter"
      @leave="onLeave"
    >
      <q-img
        v-for="card in myCards"
        :src="card.image"
        :key="card.id"
        class="responsive-card-image"
      />
    </transition-group>
  </div>
</template>
<script setup>
import {usePokerStore} from "stores/poker-store"
import {computed} from "vue"
import gsap from "gsap"

const myCards = computed(() => usePokerStore().myCards)
const beforeEnter = (el) => {
  el.style.opacity = 0
  el.style.transform = "translate(50vw, -50vh)"
}

const onEnter = (el, done) => {
  const delay = el.dataset.index * 2 + 1
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
    y: "-50vh",
    x: "50vw",
    opacity: 0,
    duration: 0.25,
    delay: 0,
    onComplete: done,
  })
}
</script>

<style>
.my-cards {
  position: fixed;
  bottom: 10px;
  left: 15px;
}
.responsive-card-image {
  width: 30vw; /* Adjust the width as a percentage of the viewport width */
  height: auto; /* Maintain the aspect ratio */
  max-width: 122px; /* Optional: Set a max-width if needed */
}

/* Adjustments for smaller screens */
@media (max-width: 600px) {
  .responsive-card-image {
    width: 50vw; /* Increase the width on smaller screens */
  }
}

/* Further adjustments for larger screens if necessary */
@media (min-width: 1200px) {
  .responsive-card-image {
    width: 15vw; /* Decrease the width on larger screens */
  }
}
</style>
