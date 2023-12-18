<template>
  <q-dialog v-model="raiseModal">
    <q-card class="bg-primary text-white">
      <q-btn flat round dense icon="close" v-close-popup />
      <q-card-section class="player-action-title row justify-center">
        Raise the bet
        <q-img src="../../assets/minus-sign.png" width="20px" />
      </q-card-section>
      <q-card-section> canRaise={{ canRaise }} </q-card-section>
      <q-card-section>
        <q-btn-group spread>
          <q-btn
            label="10"
            color="secondary"
            :disable="10 < canRaise"
            @click="onButtonClick(10)"
          ></q-btn>
          <q-btn
            label="20"
            color="secondary"
            :disable="20 < canRaise"
            @click="onButtonClick(20)"
          ></q-btn>
          <q-btn
            label="50"
            color="secondary"
            :disable="50 < canRaise"
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
        <q-form @submit="onRaise">
          <div class="row flex-center bg-euc q-mb-lg">
            <div class="row flex-center bg-euc">
              <q-btn @click="increment" class="eucalyptusButton">
                <q-icon name="add" />
              </q-btn>
              <q-input
                type="number"
                item-aligned
                filled
                borderless
                class="amountRaiseText"
                v-model.number="raiseAmountForm"
                :min="canRaise || smallBlindBetAmount"
                :rules="[validateMinRaise]"
                style="max-width: 200px"
              />
              <q-btn class="eucalyptusButton" @click="decrement">
                <q-icon name="remove" />
              </q-btn>
            </div>
          </div>
          <div class="column">
            <q-btn
              class="q-mb-sm"
              type="submit"
              label="raise"
              color="secondary"
            />
            <q-btn
              label="cancel"
              @click="raiseModal = false"
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
  name: "RaiseModal",
  mixins: [DialogMixin],
  data() {
    return { raiseAmountForm: this.canRaise || -1 }
  },
  computed: {
    ...mapState(usePokerStore, [
      "canRaise",
      "tableId",
      "balance",
      "smallBlindBetAmount",
    ]),
  },
  methods: {
    decrement() {
      const j = this.canRaise || this.smallBlindBetAmount
      if (j < this.raiseAmountForm) this.raiseAmountForm -= 10
    },
    increment() {
      this.raiseAmountForm += 10
    },
    onButtonClick(amount) {
      if (amount === "all-in") {
        this.raiseAmountForm = this.balance
      } else {
        this.raiseAmountForm = amount
      }
      this.onRaise()
    },
    onRaise() {
      raise(this.tableId, this.raiseAmountForm)
      this.raiseModal = false
    },
    validateMinRaise(a) {
      const j = this.canRaise || this.smallBlindBetAmount
      return j < a
    },
  },
  watch: {
    canRaise: function (n, o) {
      if (n) {
        this.raiseAmountForm = n
      }
    },
  },
}
</script>

<style scoped lang="scss">
.account-popup {
  width: 446px;
  height: 351px;

  /* Box Shadows / Dark */

  box-shadow: 0px 0px 22px 5px rgba(0, 0, 0, 0.5);
  border-radius: 22px;
}
.background-euc {
  background: $Eucalyptus;
}

.amountFormWrapper {
  width: 339px;
  height: 49px;
  font-size: 40px;
}

.amountRaiseText {
  font-size: 40px;
}

.eucalyptusButton {
  background: $Eucalyptus;
  font-family: "Mukta";
  font-size: 40px;
  border: #0d6757;
}
</style>
