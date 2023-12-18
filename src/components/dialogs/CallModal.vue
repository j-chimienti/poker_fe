<template>
  <q-dialog v-model="callModal">
    <div class="bg-primary account-popup">
      <q-img src="../../assets/close.png" class="close-dialog-btn" />
      <div class="player-action-title row justify-center">call the bet</div>
      <div class="player-action-text text-center">
        calling the bet will put {{ callAmount }} into the pot
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

<script>
import { mapState } from "pinia"
import { usePokerStore } from "stores/poker-store"
import DialogMixin from "src/mixins/DialogMixin.vue"
import * as apiService from "src/services/apiService"

export default {
  name: "CallModal",
  mixins: [DialogMixin],
  methods: {
    onCall() {
      apiService.call(this.table.id)
      this.callModal = false
    },
  },
  computed: {
    ...mapState(usePokerStore, ["table", "callAmount"]),
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
</style>
