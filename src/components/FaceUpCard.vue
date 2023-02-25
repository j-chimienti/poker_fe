<template>
  <PlayingCard :card="card" klass="card-dealer-face-up" />
</template>

<script>
import PlayingCard from "./PlayingCard.vue"
import {mapState} from "pinia"
import {useBlackjackStore} from "stores/blackjack-store"

export default {
  name: "FaceUpCard",
  components: { PlayingCard },
  props: ['card']
}
</script>

<style scoped></style>
