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
            <q-btn label="cancel" @click="closeModal" color="secondary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {computed, ref, watch} from "vue"
import {usePokerStore} from "stores/poker-store"
import {useUiStore} from "stores/ui-store"

const pokerStore = usePokerStore()
const uiStore = useUiStore()

const betAmount = ref(0)

// Computed properties
const canBet = computed(() => pokerStore.canBet)
const bigBlindBetAmount = computed(() => pokerStore.bigBlindBetAmount)
const balance = computed(() => pokerStore.balance)
const table = computed(() => pokerStore.table)

// Initialize betAmount with the minimum raise or big blind bet amount
const initBetAmount = () => {
  betAmount.value = canBet.value || bigBlindBetAmount.value
}
watch(canBet, initBetAmount)

const closeModal = uiStore.toggleModal("betModal", false)

const betModal = computed({
  get: () => uiStore.betModal,
  set: (value) => (uiStore.betModal = value),
})

const onButtonClick = (amount) => {
  if (amount === "all-in") {
    betAmount.value = balance.value
  } else {
    betAmount.value = amount
  }
  onBet()
}

const onBet = () => {
  uiStore.sendBet(table.value, betAmount.value)
}
const myTurn = computed(() => pokerStore.myTurn)
watch(myTurn, onMyTurnUpdate)

function onMyTurnUpdate(n, o) {
  if (betModal.value && !n && o) {
    uiStore.toggleModal("betModal", false)
  }
}

// Initial setup
initBetAmount()
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
