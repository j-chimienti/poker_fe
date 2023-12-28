<template>
  <div class="chat-container" v-if="chatVisible">
    <div class="card">
      <q-card-section>
        <div class="row flex-center q-my-md">
          <q-img
            class="close-btn cursor-pointer"
            @click="closeChat"
            src="../assets/close.png"
            width="56px"
            height="56px"
          />
          <div class="chat-header text-center">chat</div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-chat-message
          v-for="message in computedChatMessages"
          :key="message"
          :name="message.playerName"
          :avatar="getPlayerInfo(message.playerName)"
          :text="[message.message]"
        />
      </q-card-section>
      <q-card-section class="chat-form">
        <SendMessageForm />
      </q-card-section>
    </div>
  </div>
</template>

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
    required: true,
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
  position: absolute;
  width: 435px;
  height: 673px;
  right: 100px;
  bottom: 20px;

  z-index: 1000;
  background: #0d6757;
  /* Soft Blur */

  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.chat-header {
  font-family: "Wonderbar";
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 18px;
  /* or 45% */

  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;
}

.close-btn {
  left: 12px;
  position: absolute;
}
.chat-form {
  position: absolute;
  bottom: 0;
}
</style>
