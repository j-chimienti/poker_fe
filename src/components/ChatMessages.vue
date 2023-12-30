<template>
  <div class="chat-container" v-if="chatVisible">
    <div class="card full-height">
      <q-card-section class="row justify-center">
        <q-btn
          flat
          round
          dense
          icon="close"
          class="close-button"
          @click="closeChat"
        />
        <div class="text-h3">chat</div>
      </q-card-section>

      <!-- Chat Messages Section -->
      <q-card-section>
        <q-chat-message
          v-for="message in computedChatMessages"
          :key="message.id"
          :name="message.playerName"
          :avatar="getPlayerInfo(message.playerName)"
          :text="[message.message]"
        />
      </q-card-section>

      <!-- Chat Form Section -->
      <q-card-section class="chat-form">
        <SendMessageForm />
      </q-card-section>
    </div>
  </div>
</template>

<!-- Rest of the script remains the same -->

<script setup>
import { computed } from "vue"
import { usePokerStore } from "stores/poker-store"
import { getAvatar } from "src/services/avatarService"
import SendMessageForm from "components/SendMessageForm.vue"
import { get } from "lodash"

// Define props
const props = defineProps({
  tableId: {
    type: String,
  },
})

// Accessing the store
const store = usePokerStore()

// Methods
const closeChat = () => {
  store.chatVisible = false
}

const getPlayerInfo = (playerName) => {
  const found = store.allPlayers.find(
    (p) => p.name.toLowerCase() === playerName.toLowerCase()
  )
  return getAvatar(found)
}

// Computed properties
const chatVisible = computed(() => store.chatVisible)

const computedChatMessages = computed(() =>
  get(store.chatMessages, props.tableId, []).slice(-7)
)
</script>

<style scoped>
.chat-container {
  position: fixed; /* Changed from absolute to fixed */
  width: 435px;
  height: 673px;
  right: 50px; /* Adjust to position the container from the right edge of the viewport */
  bottom: 20px; /* Adjust to position the container from the bottom edge of the viewport */

  z-index: 1000;
  background: #0d6757;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chat-messages {
  overflow-y: auto;
  flex-grow: 1; /* Makes the chat messages area take up the available space */
}

.chat-form {
  position: sticky;
  bottom: 0;
}
</style>
