<template>
<q-dialog v-model="callTheBetModal">
  <div class="bg-primary account-popup">
  <div class="player-action-title row justify-center">call the bet</div>
  <div class="player-action-text text-center">calling the bet will put XX into the pot</div>
  <div class="column">
    <q-btn label="call" @click="call(table.id); callTheBetModal = false"/>
    <q-btn label="cancel"/>
  </div>
  <div class="row justify-center">
    <q-checkbox :model-value="dontAskAgain.call" label="don't ask me again"/>
  </div>
  </div>
</q-dialog>
</template>

<script>
import {mapState} from "pinia";
import {usePokerStore} from "stores/poker-store";
import DialogMixin from "src/mixins/DialogMixin.vue";
import ApiMixin from "src/mixins/ApiMixin.vue";
import {useUiStore} from "stores/ui-store";

export default {
  name: "CallTheBetModal",
  mixins: [DialogMixin, ApiMixin],
  data() {
    return { raiseAmount: 100 }
  },
  computed: {
    ...mapState(usePokerStore, ['table']),
    ...mapState(useUiStore, ['dontAskAgain'])

  },
  methods: {

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
