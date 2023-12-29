<template>
  <q-dialog v-model="callModal">
    <div class="bg-primary account-popup">
      <q-img src="../../assets/close.png" class="close-dialog-btn" />
      <div class="player-action-title row justify-center">call the bet</div>
      <div class="player-action-text text-center">
        calling the bet will put {{ formatToUSD(canCall) }} into the pot
      </div>
      <div class="row justify-center q-my-sm">
        <q-btn
          color="secondary"
          class="player-action-button"
          label="call"
          @click="onCall"
        />
      </div>
      <div class="row justify-center q-my-sm">
        <q-btn color="secondary" class="player-action-button" label="cancel" />
      </div>
      <div class="row justify-center" style="margin-bottom: 24px">
        <q-checkbox v-model="dontAskCall" label="don't ask me again" />
      </div>
    </div>
  </q-dialog>
</template>

<script setup>
import {computed} from "vue"
import {usePokerStore} from "stores/poker-store"
import {useUiStore} from "stores/ui-store"
import * as apiService from "src/services/apiService"
import {formatToUSD} from "src/services/moneyUtils"

const pokerStore = usePokerStore()
const uiStore = useUiStore()
const dontAskCall = computed(() => uiStore.dontAskCall)
const callModal = computed({
  get: () => uiStore.callModal,
  set: (value) => (uiStore.callModal = value),
})
const tableId = computed(() => pokerStore.tableId)
const canCall = computed(() => pokerStore.canCall)

const onCall = () => {
  apiService.call(tableId.value)
  uiStore.toggleModal("callModal", false)
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
