<template>
  <PlayingCard :card="faceUp" klass="card-dealer-face-up" />
</template>

<script>
import PlayingCard from "./PlayingCard.vue"
import {mapState} from "pinia"
import {useBlackjackStore} from "stores/blackjack-store"

export default {
  name: "FaceUpCard",
  components: { PlayingCard },
  computed: {
    ...mapState(useBlackjackStore, ["faceUp"]),
  },
}
</script>

<style scoped></style>
