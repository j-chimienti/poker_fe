<template>
  <div class="row flex justify-around">
    <q-btn
      round
      size="xl"
      color="primary"
      :disabled="isDisabled"
      @click="move('Hit')"
      label="Hit"
      class="hit_button"
    />
    <q-btn
      round
      size="xl"
      color="primary"
      :disabled="isDisabled"
      @click="move('Stand')"
      label="Stand"
      class="stand_button"
    />
  </div>
</template>

<script>
import { GAME_STATES } from "../services/constants"
import StoreMixin from "src/mixins/StoreMixin.vue"

export default {
  name: "BlackjackMove",
  mixins: [StoreMixin],
  computed: {
    isDisabled() {
      return this.gameState !== GAME_STATES.move
    },
  },
  methods: {
    move(m) {
      this.move(m)
    },
  },
}
</script>

<style scoped></style>
