<template>
<q-dialog v-model="raiseTheBetModalVisible">
  <div class="bg-primary account-popup">
  <div class="player-action-title row justify-center">Raise the bet</div>
  <div class="row justify-center">
    <q-form @submit="onRaise">
      <q-input type="number" v-model.number="raiseAmount"/>
    </q-form>
  </div>
  </div>
</q-dialog>
</template>

<script>
import {raise} from "src/services/apiService";
import {mapState} from "pinia";
import {usePokerStore} from "stores/poker-store";
import DialogMixin from "src/mixins/DialogMixin.vue";

export default {
  name: "RaiseTheBetModal",
  mixins: [DialogMixin],
  data() {
    return { raiseAmount: 100 }
  },
  computed: {
    ...mapState(usePokerStore, ['table']),

  },
  methods: {
    onRaise() {
      raise(this.table.id, this.raiseAmount)
      this.raiseTheBetModalVisible = false;
    },
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
