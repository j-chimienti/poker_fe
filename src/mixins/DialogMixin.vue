<script>
import {useUiStore} from "stores/ui-store";

export default {
  name: "DialogMixin",
  computed: {
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
    rightDrawerOpen: {
      get() { return useUiStore().rightDrawerOpen },
      set(v) { useUiStore().rightDrawerOpen = v }
    }
  },
}
</script>

<style scoped></style>
