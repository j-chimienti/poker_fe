<script setup>
import { useUiStore } from "stores/ui-store"
import { computed } from "vue"
import { usePokerStore } from "stores/poker-store"
import * as apiService from "src/services/apiService"
import { useRouter } from "vue-router"
import { pages } from "src/constants"

const uiStore = useUiStore()
const router = useRouter()

const confirmLeaveTableModalVisible = computed({
  get: () => uiStore.confirmLeaveTableModalVisible,
  set: (value) => (uiStore.confirmLeaveTableModalVisible = value),
})

function leaveTable() {
  const tableId = usePokerStore().tableId
  if (!tableId) return
  uiStore.confirmLeaveTableModalVisible = false
  apiService.leave(tableId)
  return router.push({ name: pages.lobby })
}

function dontLeave() {
  uiStore.toggleModal("confirmLeaveTableModalVisible", false)
}
</script>

<template>
  <q-dialog v-model="confirmLeaveTableModalVisible">
    <q-card>
      <q-card-section class="row justify-center">
        <q-btn
          flat
          round
          dense
          icon="close"
          v-close-popup
          class="close-button"
        />
        <div class="player-action-title">Leave</div>
      </q-card-section>
      <p class="text-center">Are you sure you want to leave?</p>
      <q-card-section class="column justify-center">
        <q-btn
          label="confirm"
          color="danger"
          @click="leaveTable"
          class="q-mb-sm"
        />
        <q-btn label="cancel" @click="dontLeave" color="secondary" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
