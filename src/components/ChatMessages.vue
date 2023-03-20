<template>
  <div class="chat-container">
  <div style="max-height: 400px; overflow-y: scroll; overflow-x: hidden">
    <div style="width: 100%; max-width: 400px">
      <q-chat-message v-for="message in chatMessages" :key="message"
                      :name="message.playerName"
                      :avatar="getPlayerInfo(message.playerName)"
                      :text="[message.message]"
                      sent
      />
    </div>
  </div>
  <div>
    <q-form @submit="sendMessage">
      <q-input v-model="msg"/>
    </q-form>
    </div>
  </div>
</template>

<script>
import {usePokerStore} from "stores/poker-store";
import {get, reverse} from 'lodash';
import {mapState} from "pinia";
import {getAvatar} from "src/services/avatarService";
export default {
  data() { return {msg: ''}},
  methods: {
    getPlayerInfo(playerName) {
      const found = this.pokerPlayersByPosition.find(p => p.name.toLowerCase() === playerName.toLowerCase())
      return found && getAvatar(found) || 'https://cdn.quasar.dev/img/avatar1.jpg'

    },
    sendMessage() {

      this.msg = ''
    }
  },
  computed: {
    ...mapState(usePokerStore, ['pokerPlayersByPosition']),
    chatMessages() {
        return  reverse(get(usePokerStore().chatMessages, "1", []))
    }
  }
}
</script>

<style scoped>
.chat-container {
  position: absolute;
  bottom: 0;
  left: 20;
}
</style>
