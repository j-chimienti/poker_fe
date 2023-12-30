<template>
  <q-dialog v-model="callModal">
    <q-card>
      <q-card-section class="row justify justify-center">
        <q-btn
          flat
          round
          dense
          icon="close"
          v-close-popup
          class="close-button"
        />
        <span class="player-action-title">call the bet</span>
      </q-card-section>
      <q-card-section class="justify-center"
        >calling the bet will put {{ callAmountUSD }} into the
        pot</q-card-section
      >
      <q-card-section class="column justify-center">
        <q-btn
          color="secondary"
          class="player-action-button q-mb-sm"
          label="call"
          @click="onCall"
        />
        <q-btn
          color="secondary"
          class="player-action-button"
          label="cancel"
          v-close-popup
        />
      </q-card-section>
      <q-card-actions>
        <q-checkbox v-model="dontAskCall" label="don't ask me again" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, watch } from "vue"
import { usePokerStore } from "stores/poker-store"
import { useUiStore } from "stores/ui-store"
import * as apiService from "src/services/apiService"

const pokerStore = usePokerStore()
const uiStore = useUiStore()
const dontAskCall = computed(() => uiStore.dontAskCall)
const callModal = computed({
  get: () => uiStore.callModal,
  set: (value) => (uiStore.callModal = value),
})
const tableId = computed(() => pokerStore.tableId)
const callAmountUSD = computed(() => pokerStore.callAmountUSD)

const onCall = () => {
  apiService.call(tableId.value)
  uiStore.toggleModal("callModal", false)
}
</script>

<style scoped></style>
