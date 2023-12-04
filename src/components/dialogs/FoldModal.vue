<template>
  <q-dialog v-model="foldModal">
    <q-card class="bg-primary account-popup">
      <q-card-section class="player-action-title flex-center"
        >fold</q-card-section
      >
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
          <q-btn label="cancel" @click="foldModal = false" color="secondary" />
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

<script>
import { mapState } from "pinia"
import { usePokerStore } from "stores/poker-store"
import DialogMixin from "src/mixins/DialogMixin.vue"
import ApiMixin from "src/mixins/ApiMixin.vue"

export default {
  name: "FoldModal",
  mixins: [DialogMixin, ApiMixin],
  methods: {
    onFold() {
      if (!this.tableId) {
        alert("cannot fold, missing table")
      } else {
        this.fold(this.tableId)
        this.foldModal = false
      }
    },
  },
  computed: {
    ...mapState(usePokerStore, ["tableId"]),
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
