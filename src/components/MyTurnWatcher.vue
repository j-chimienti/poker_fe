<script setup>
import { computed, watch } from "vue"
import { usePokerStore } from "stores/poker-store"
import { useUiStore } from "stores/ui-store"

const myTurn = computed(() => usePokerStore().myTurn)
const original = document.title

let uiStore = useUiStore()
const raiseModal = computed(() => uiStore.raiseModal)

const betModal = computed(() => uiStore.betModal)
const foldModal = computed(() => uiStore.foldModal)
const callModal = computed(() => uiStore.callModal)

watch(myTurn, function (n) {
  if (n) document.title = "your turn!"
  else {
    document.title = original
    if (raiseModal) uiStore.closeModal("raiseModal")
    if (betModal) uiStore.closeModal("betModal")
    if (foldModal) uiStore.closeModal("foldModal")
    if (callModal) uiStore.closeModal("callModal")
  }
})
</script>
