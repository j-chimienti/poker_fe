<script>
import { useUiStore } from "stores/ui-store"
import { mapState } from "pinia"

export default {
  name: "DialogMixin",
  computed: {
    ...mapState(useUiStore, ["dontAskAgain"]),

    playAnotherHandModalVisible: {
      get() {
        return useUiStore().playAnotherHandModalVisible
      },
      set(v) {
        useUiStore().playAnotherHandModalVisible = v
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
    raiseModal: {
      get() {
        return useUiStore().raiseModal
      },
      set(v) {
        useUiStore().raiseModal = v
      },
    },
    foldModal: {
      get() {
        return useUiStore().foldModal
      },
      set(v) {
        useUiStore().foldModal = v
      },
    },
    leaveModal: {
      get() {
        return useUiStore().leaveModal
      },
      set(v) {
        useUiStore().leaveModal = v
      },
    },
    betModal: {
      get() {
        return useUiStore().betModal
      },
      set(v) {
        useUiStore().betModal = v
      },
    },
    callModal: {
      get() {
        return useUiStore().callModal
      },
      set(v) {
        useUiStore().callModal = v
      },
    },
    checkModal: {
      get() {
        return useUiStore().checkModal
      },
      set(v) {
        useUiStore().checkModal = v
      },
    },
    dontAskCall: {
      get() {
        return useUiStore().dontAskCall
      },
      set(v) {
        useUiStore().dontAskCall = v
      },
    },
    dontAskFold: {
      get() {
        return useUiStore().dontAskFold
      },
      set(v) {
        useUiStore().dontAskFold = v
      },
    },
  },
}
</script>

<style scoped></style>
