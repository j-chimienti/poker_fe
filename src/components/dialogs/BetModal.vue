<template>
  <q-dialog v-model="betModal">
    <q-card class="bg-primary account-popup text-white">
      <q-card-section class="player-action-title row justify-center"
        >Bet</q-card-section
      >
      <q-card-section>
        <q-btn-group spread>
          <q-btn
            label="10"
            color="secondary"
            :disable="10 < canBet"
            @click="onButtonClick(10)"
          ></q-btn>
          <q-btn
            label="20"
            color="secondary"
            :disable="20 < canBet"
            @click="onButtonClick(20)"
          ></q-btn>
          <q-btn
            label="50"
            color="secondary"
            :disable="50 < canBet"
            @click="onButtonClick(50)"
          ></q-btn>
          <q-btn
            label="All-In"
            color="secondary"
            @click="onButtonClick('all-in')"
          ></q-btn>
        </q-btn-group>
      </q-card-section>
      <q-card-section>
        <q-form @submit="onBet">
          <div class="row flex-center bg-euc q-mb-lg">
            <div class="row flex-center bg-euc">
              <q-btn @click="betAmount += 10" class="eucalyptusButton">
                <q-icon name="add" />
              </q-btn>
              <q-input
                type="number"
                item-aligned
                filled
                borderless
                class="amountRaiseText"
                v-model.number="betAmount"
                style="max-width: 200px"
              />
              <q-btn class="eucalyptusButton" @click="betAmount -= 10">
                <q-icon name="remove" />
              </q-btn>
            </div>
          </div>
          <div class="column">
            <q-btn
              type="submit"
              label="bet"
              color="secondary"
              class="q-mb-sm"
            />
            <q-btn label="cancel" @click="betModal = false" color="secondary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState } from "pinia"
import { usePokerStore } from "stores/poker-store"
import { useUiStore } from "stores/ui-store"
import DialogMixin from "src/mixins/DialogMixin.vue"

export default {
  name: "BetModal",
  mixins: [DialogMixin],
  data() {
    const minRaise = this.canBet || this.bigBlindBetAmount
    return { betAmount: minRaise }
  },
  computed: {
    ...mapState(usePokerStore, [
      "table",
      "canBet",
      "bigBlindBetAmount",
      "balance",
    ]),
  },
  methods: {
    onButtonClick(amount) {
      if (amount === "all-in") {
        this.betAmount = this.balance
      } else {
        this.betAmount = amount
      }
      this.onBet()
    },
    onBet() {
      useUiStore().sendBet(this.table, this.betAmount)
    },
  },
  watch: {
    canBet: function (n, o) {
      this.betAmount = n
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
.eucalyptusButton {
  background: $Eucalyptus;
  font-family: "Mukta";
  font-size: 40px;
  border: #0d6757;
}
</style>
