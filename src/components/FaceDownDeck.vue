<template>
  <div class="playingCards">
    <ul class="deck">
      <li v-for="card in deck" :key="card">
        <div class="card back">*</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FaceDownDeck",
  data() {
    return {
      deck: Array.from({ length: this.numCards }, (x, i) => i),
    }
  },
  props: {
    numCards: {
      default: 25,
      type: Number,
    },
  },
}
</script>

<style scoped></style>
