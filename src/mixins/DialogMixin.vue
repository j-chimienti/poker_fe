<script>
import {useUiStore} from "stores/ui-store";
import {mapState} from "pinia";

export default {
  name: "DialogMixin",
  computed: {
    ...mapState(useUiStore, ['dontAskAgain']),
    invoiceModalVisible: {
      get() {
        return useUiStore().invoiceModalVisible
      },
      set(v) {
        useUiStore().invoiceModalVisible = v
      },
    },
    debitModalVisible: {
      get() {
        return useUiStore().debitModalVisible
      },
      set(v) {
        useUiStore().debitModalVisible = v
      },
    },
    loginModalVisible: {
      get() {
        return useUiStore().loginModalVisible
      },
      set(v) {
        useUiStore().loginModalVisible = v
      },
    },
    accountModalVisible: {
      get() {
        return useUiStore().accountModalVisible
      },
      set(v) {
        useUiStore().accountModalVisible = v
      },
    },
    raiseTheBetModalVisible: {
      get() { return useUiStore().raiseTheBetModalVisible },
      set(v) { useUiStore().raiseTheBetModalVisible = v }
    },
    foldModal: {
      get() { return useUiStore().foldModal },
      set(v) { useUiStore().foldModal = v }
    },
    leaveModal: {
      get() { return useUiStore().leaveModal },
      set(v) { useUiStore().leaveModal = v }
    },
    callTheBetModal: {
      get() { return useUiStore().callTheBetModal },
      set(v) { useUiStore().callTheBetModal = v }
    },
    checkModal: {
      get() { return useUiStore().checkModal },
      set(v) { useUiStore().checkModal = v }
    }

  },
}
</script>

<style scoped></style>
