<template>
  <div class="row flex-center player-actions" v-if="showButtons">
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
      :label="getCallLabel"
    />
    <q-btn
      class="player-buttons"
      :disabled="!myTurn"
      @click="onFold(table.id)"
      color="secondary"
      label="fold"
    />
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia"
import { usePokerStore } from "stores/poker-store"
import { useUiStore } from "stores/ui-store"
import { rounds } from "src/constants"

export default {
  name: "PlayerPokerButtons",
  methods: {
    ...mapActions(useUiStore, [
      "onCall",
      "onFold",
      "onCheck",
      "onRaise",
      "onBet",
    ]),
  },
  computed: {
    showButtons() {
      return (
        this.round !== rounds.SHOWDOWN &&
        this.round !== rounds.WAITING &&
        this.myCards.length > 0
      )
    },
    getCallLabel() {
      return `call ${this.canCall}`
    },
    ...mapState(usePokerStore, [
      "table",
      "round",
      "playerOpt",
      "myTurn",
      "chatVisible",
      "playerTurn",
      "canCheck",
      "canCall",
      "canRaise",
      "myCards",
      "canBet",
    ]),
  },
}
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
</style>
