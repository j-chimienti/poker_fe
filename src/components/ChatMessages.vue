<template>
  <transition name="slide-fade">
    <div class="chat-container" v-if="chatVisible">
      <div class="card full-height-c">
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
        <q-card-section class="chat-messages">
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
  </transition>
</template>

<!-- Rest of the script remains the same -->

<script setup>
import { computed } from "vue"
import { usePokerStore } from "stores/poker-store"
import { getAvatar } from "src/services/avatarService"
import SendMessageForm from "components/SendMessageForm.vue"
import get from "lodash.get"

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
  position: fixed;
  width: 435px;
  height: 673px;
  right: 50px;
  bottom: 20px;
  z-index: 1000;
  background: #0d6757;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.full-height-c {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-messages {
  overflow-y: auto;
  flex-grow: 1;
}

.chat-form {
  flex-shrink: 0;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
