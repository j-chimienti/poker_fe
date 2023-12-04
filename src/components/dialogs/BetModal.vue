<template>
  <q-dialog v-model="betModalVisible" v-if="table">
    <q-card class="bg-primary account-popup text-white">
      <q-card-section class="player-action-title row justify-center"
        >Raise the bet</q-card-section
      >
      <q-card-section>
        <q-form @submit="onBet">
          <div class="row flex-center">
            <q-btn @click="betAmount += 10">+</q-btn>
            <q-input
              type="number"
              item-aligned
              v-model.number="betAmount"
              style="max-width: 200px"
            />
            <q-btn @click="betAmount -= 10">-</q-btn>
          </div>
          <div class="column">
            <q-btn
              @click="onBet"
              type="submit"
              label="raise"
              color="secondary"
              class="q-mb-sm"
            />
            <q-btn
              label="cancel"
              @click="raiseTheBetModalVisible = false"
              color="secondary"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { bet } from "src/services/apiService"
import { mapState } from "pinia"
import { usePokerStore } from "stores/poker-store"
import DialogMixin from "src/mixins/DialogMixin.vue"

export default {
  name: "BetModal",
  mixins: [DialogMixin],
  data() {
    const minRaise = this.canBet || 1
    return { betAmount: minRaise }
  },
  computed: {
    ...mapState(usePokerStore, ["table", "canBet"]),
  },
  methods: {
    onBet() {
      bet(this.table.id, this.betAmount)
      this.betModalVisible = false
    },
  },
}
</script>

<style scoped>
.account-popup {
  width: 446px;
  height: 351px;

  /* Box Shadows / Dark */

  box-shadow: 0px 0px 22px 5px rgba(0, 0, 0, 0.5);
  border-radius: 22px;
}
</style>
