<template>
  <q-form @submit.prevent="sendMessage">
    <q-input
      v-model.lazy="msg"
      ref="messageInput"
      :error="hasError"
      placeholder="Say something..."
      :error-message="errorMsg"
    >
      <template v-slot:append>
        <q-btn
          type="submit"
          color="accent"
          text-color="white"
          icon="send"
          flat
          :disabled="hasError"
          @click="sendMessage"
        />
      </template>
    </q-input>
  </q-form>
</template>

<script setup>
import { computed, ref, watch } from "vue"
import { chatMessage } from "src/services/apiService"
import { usePokerStore } from "stores/poker-store"
import { Notify } from "quasar"

const msg = ref("")
const isDirty = ref(false) // Track if the user has interacted with the input
const messageInput = ref(null) // Create a ref for the input

let pokerStore = usePokerStore()
const tableId = computed(() => pokerStore.room)

const hasError = computed(() => {
  return isDirty.value && (msg.value.length < 1 || msg.value.length > 240)
})

const errorMsg = "Must be between 1 and 240 characters"

// Watch for changes in msg to set isDirty
watch(msg, (newValue, oldValue) => {
  if (oldValue === "" && newValue !== "") {
    isDirty.value = true
  }
})

const sendMessage = () => {
  isDirty.value = true
  if (!hasError.value) {
    chatMessage(msg.value, tableId.value)
    msg.value = ""
    isDirty.value = false
    messageInput.value && messageInput.value.focus() // Focus the input field
  } else {
    Notify.create("invalid " + msg.value.length)
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
