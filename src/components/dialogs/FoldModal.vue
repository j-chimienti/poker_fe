<template>
  <q-dialog v-model="foldModal">
    <q-card class="bg-primary account-popup">
      <q-card-section class="row justify-center">
        <q-btn
          flat
          round
          dense
          icon="close"
          v-close-popup
          class="close-button"
        />
        <div class="player-action-title">fold</div>
      </q-card-section>
      <q-card-section class="player-action-text text-center"
        >are you sure you want to fold</q-card-section
      >
      <q-card-section>
        <div class="column">
          <q-btn
            label="fold"
            @click="onFold"
            color="secondary"
            class="q-mb-sm"
          />
          <q-btn label="cancel" @click="closeFoldModal" color="secondary" />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row justify-center">
          <q-checkbox v-model="dontAskFold" label="don't ask me again" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, watch } from "vue"
import { usePokerStore } from "stores/poker-store"
import { useUiStore } from "stores/ui-store"
import { fold } from "src/services/apiService"

const pokerStore = usePokerStore()
const uiStore = useUiStore()
const foldModal = computed({
  get: () => uiStore.foldModal,
  set: (value) => (uiStore.foldModal = value),
})
const tableId = computed(() => pokerStore.tableId)
const dontAskFold = computed(() => uiStore.dontAskFold)

function closeFoldModal() {
  uiStore.toggleModal("foldModal", false)
}

const onFold = () => {
  if (!tableId.value) {
    alert("cannot fold, missing table")
  } else {
    fold(tableId.value)
    closeFoldModal()
  }
}
const myTurn = computed(() => pokerStore.myTurn)
watch(myTurn, onMyTurnUpdate)

function onMyTurnUpdate(n) {
  if (foldModal.value && !n) {
    uiStore.toggleModal("foldModal", false)
  }
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
