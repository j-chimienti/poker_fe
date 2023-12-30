<template>
  <div class="toolbar q-pa-md">
    <q-toolbar class="flex justify-between">
      <img src="../assets/logo.png" class="toolbar-logo" />
      <div class="toolbar-icons">
        <img
          src="../assets/msg-home.png"
          @click="openChat"
          class="cursor-pointer q-mr-md"
        />
        <img
          src="../assets/account.png"
          @click="openAccountModal"
          class="cursor-pointer"
        />
      </div>
    </q-toolbar>
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
.toolbar {
  box-shadow: 0px 0px 22px 5px rgba(0, 0, 0, 0.5);
}
.toolbar-logo {
  max-width: 20vw; /* Adjust as needed */
  max-height: auto; /* Maintain aspect ratio */
}

.toolbar-icons {
  display: flex;
  align-items: center;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .toolbar-logo {
    max-width: 30vw; /* Larger percentage for smaller screens */
  }

  .toolbar-icons img {
    width: 24px; /* Smaller icons for small screens */
    height: 24px;
  }
}
</style>
