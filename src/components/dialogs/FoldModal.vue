<template>
<q-dialog v-model="foldModal">
  <div class="bg-primary account-popup">
    <div class="player-action-title text-center">fold</div>
    <div class="player-action-text text-center">are you sure you want to fold</div>
    <div class="column">
      <q-btn label="fold" @click="fold(table.id); foldModal = false"/>
      <q-btn label="cancel" @click="foldModal = false"/>
    </div>
    <div class="row justify-center">
      <q-checkbox :model-value="dontAskAgain.fold" label="don't ask me again"/>
    </div>
  </div>
</q-dialog>
</template>

<script>
import {raise} from "src/services/apiService";
import {mapState} from "pinia";
import {usePokerStore} from "stores/poker-store";
import DialogMixin from "src/mixins/DialogMixin.vue";
import ApiMixin from "src/mixins/ApiMixin.vue";
import {useUiStore} from "stores/ui-store";

export default {
  name: "FoldModal",
  mixins: [DialogMixin, ApiMixin],
  computed: {
    ...mapState(usePokerStore, ['table']),
    ...mapState(useUiStore, ['dontAskAgain'])

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
