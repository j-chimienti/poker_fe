<template>
  <div class="header row">
    <img
      src="../assets/logo.png"
      width="474"
      @click="$router.push({ name: 'home' })"
      height="58"
    />
    <div style="position: absolute; top: 27px; right: 28px">
      <img
        src="../assets/msg-home.png"
        @click="openChat"
        class="q-mr-md cursor-pointer"
      />
      <img
        class="cursor-pointer"
        src="../assets/account.png"
        @click="openAccountModal"
      />
    </div>
  </div>
  <AccountInfoModal />
</template>
<script setup>
import { useUiStore } from "stores/ui-store"
import { usePokerStore } from "stores/poker-store"
import { computed } from "vue"
import AccountInfoModal from "components/dialogs/AccountInfoModal.vue"

const uiStore = useUiStore()

const openChat = () => usePokerStore().openChat()

const openAccountModal = () => uiStore.toggleModal("accountModalVisible", true)

const accountModalVisible = computed(() => uiStore.accountModalVisible)
</script>

<style>
.header {
  height: 112px;
  box-shadow: 0px 0px 22px 5px rgba(0, 0, 0, 0.5);
}
</style>
