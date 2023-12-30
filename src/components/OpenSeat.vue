<template>
  <q-btn
    v-if="!joinedTable"
    label="join"
    class="join-btn"
    @click="joinTableReq"
  />
  <q-img v-else src="../assets/logo-icon-dark.png" width="50px" />
</template>
<script setup>
import { computed } from "vue"
import { usePokerStore } from "stores/poker-store"
import { joinTable } from "src/services/apiService"
const pokerStore = usePokerStore()

const props = defineProps({
  position: { type: Number, required: true },
  tableId: {},
})

const joinedTable = computed(() => pokerStore.joinedTable)

function joinTableReq() {
  joinTable(props.tableId, props.position)
}
</script>
<style lang="scss">
.join-btn {
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
