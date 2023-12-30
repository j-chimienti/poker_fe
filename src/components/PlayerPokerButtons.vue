<template>
  <transition>
    <div class="row flex-center player-actions" v-if="myTurn">
      <q-btn
        class="player-buttons"
        v-if="canRaise"
        :disabled="!myTurn"
        @click="onRaise"
        color="secondary"
        label="raise"
      />
      <q-btn
        class="player-buttons"
        v-if="canBet"
        :disabled="!myTurn"
        @click="onBet"
        color="secondary"
        label="bet"
      />
      <q-btn
        class="player-buttons"
        v-if="canCheck"
        :disabled="!myTurn"
        @click="onCheck(table.id)"
        color="secondary"
        label="check"
      />
      <q-btn
        v-if="canCall"
        class="player-buttons"
        :disabled="!myTurn"
        @click="onCall(table.id)"
        color="secondary"
        label="call"
      />
      <q-btn
        class="player-buttons"
        :disabled="!myTurn"
        @click="onFold(table.id)"
        color="secondary"
        label="fold"
      />
    </div>
  </transition>
</template>

<script setup>
import {usePokerStore} from "stores/poker-store"
import {useUiStore} from "stores/ui-store"
import {computed} from "vue"

const pokerStore = usePokerStore()
const uiStore = useUiStore()

const table = computed(() => pokerStore.table)
const myTurn = computed(() => pokerStore.myTurn)
const canCheck = computed(() => pokerStore.canCheck)
const canCall = computed(() => pokerStore.canCall)
const canRaise = computed(() => pokerStore.canRaise)
const canBet = computed(() => pokerStore.canBet)

const onCall = uiStore.onCall
const onFold = uiStore.onFold
const onCheck = uiStore.onCheck
const onRaise = uiStore.onRaise
const onBet = uiStore.onBet
</script>

<style>
.player-actions {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.player-buttons {
  /* Auto layout */

  padding: 14px 20px;
  gap: 10px;

  width: 115px;
  height: 48px;
  /* Mango Orange */

  /* Cartoon Shadow */

  box-shadow: -3px 3px 0px 1px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  margin-left: 5px;
  margin-right: 5px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
