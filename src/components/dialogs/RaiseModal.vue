<template>
  <q-dialog v-model="raiseModal">
    <q-card>
      <q-card-section class="row justify-center">
        <q-btn flat round dense icon="close" v-close-popup />
        <div class="player-action-title">Raise the bet</div>
      </q-card-section>
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
            <q-btn label="cancel" @click="closeModal" color="secondary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref, watch } from "vue"
import { usePokerStore } from "stores/poker-store"
import { useUiStore } from "stores/ui-store"
import { raise } from "src/services/apiService"

const pokerStore = usePokerStore()
const uiStore = useUiStore()

const raiseModal = computed({
  get: () => uiStore.raiseModal,
  set: (value) => (uiStore.raiseModal = value),
})
const closeModal = uiStore.toggleModal("raiseModal", false)
const canRaise = computed(() => pokerStore.canRaise)
const tableId = computed(() => pokerStore.tableId)
const balance = computed(() => pokerStore.balance)
const smallBlindBetAmount = computed(() => pokerStore.smallBlindBetAmount)

const raiseAmountForm = ref(canRaise.value || -1)

watch(canRaise, (newValue) => {
  raiseAmountForm.value = newValue || -1
})

const decrement = () => {
  const minRaise = canRaise.value || smallBlindBetAmount.value
  if (minRaise < raiseAmountForm.value) {
    raiseAmountForm.value -= 10
  }
}

const increment = () => {
  raiseAmountForm.value += 10
}

const onButtonClick = (amount) => {
  if (amount === "all-in") {
    raiseAmountForm.value = balance.value
  } else {
    raiseAmountForm.value = amount
  }
  onRaise()
}

const onRaise = () => {
  raise(tableId.value, raiseAmountForm.value)
  raiseModal.value = false
}

const validateMinRaise = (amount) => {
  const minRaise = canRaise.value || smallBlindBetAmount.value
  return minRaise < amount
}
const myTurn = computed(() => pokerStore.myTurn)
watch(myTurn, onMyTurnUpdate)

function onMyTurnUpdate(n, o) {
  if (raiseModal.value && !n && o) {
    uiStore.toggleModal("raiseModal", false)
  }
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
