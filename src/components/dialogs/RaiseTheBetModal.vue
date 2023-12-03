<template>
  <q-dialog v-model="raiseTheBetModalVisible" v-if="table">
    <q-card class="bg-primary account-popup text-white">
      <q-card-section class="player-action-title row justify-center"
        >Raise the bet</q-card-section
      >
      <q-card-section>
        <q-form @submit="onRaise">
          <div class="row flex-center">
            <q-btn @click="raiseAmount += 10">+</q-btn>
            <q-input
              type="number"
              item-aligned
              v-model.number="raiseAmount"
              style="max-width: 200px"
            />
            <q-btn @click="raiseAmount -= 10">-</q-btn>
          </div>
          <div class="column">
            <q-btn
              @click="onRaise"
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
import { raise } from "src/services/apiService"
import { mapState } from "pinia"
import { usePokerStore } from "stores/poker-store"
import DialogMixin from "src/mixins/DialogMixin.vue"

export default {
  name: "RaiseTheBetModal",
  mixins: [DialogMixin],
  data() {
    const minRaise = this.$get(this.table, "bet.min", 100)
    return { raiseAmount: minRaise }
  },
  computed: {
    ...mapState(usePokerStore, ["table"]),
  },
  methods: {
    onRaise() {
      raise(this.table.id, this.raiseAmount)
      this.raiseTheBetModalVisible = false
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
