<template>
  <div>
    <q-btn
      round
      size="xl"
      :disabled="isDisabled"
      @click="REQUEST_BET"
      label="Deal"
      color="primary"
      class="request_bet_button"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "pinia"
import { GAME_STATES } from "../services/constants"
import { REQUEST_BET } from "../store/actions"

export default {
  data() {
    return { show: false }
  },
  computed: {
    ...mapGetters(["gameState", "bet", "balance"]),
    isDisabled() {
      return this.gameState !== GAME_STATES.bet
    },
  },
  name: "RequestDeal",
  methods: {
    ...mapActions([REQUEST_BET]),
  },
}
</script>

<style scoped></style>
