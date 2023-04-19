<template>
  <div class="chat-container" v-if="chatVisible">

    <div class="row flex-center q-my-md">
      <q-img
        class="close-btn cursor-pointer"
        @click="closeChat"
        src="../assets/close.png" width="56px" height="56px"/>
      <div class="chat-header text-center">chat</div>
    </div>
  <div style="max-height: 400px; overflow-y: scroll; overflow-x: hidden">
    <div style="width: 100%; max-width: 400px">
      <q-chat-message v-for="message in chatMessages" :key="message"
                      :name="message.playerName"
                      :avatar="getPlayerInfo(message.playerName)"
                      :text="[message.message]"
      />
    </div>
  </div>


    <SendMessageForm/>

  </div>
</template>

<script>
import {usePokerStore} from "stores/poker-store";
import {get, reverse} from 'lodash';
import {mapState} from "pinia";
import {getAvatar} from "src/services/avatarService";
import SendMessageForm from "components/SendMessageForm.vue";

export default {
  components: {SendMessageForm},
  methods: {
    closeChat() {
      usePokerStore().chatVisible = false
    },
    getPlayerInfo(playerName) {
      const found = this.allPlayers.find(p => p.name.toLowerCase() === playerName.toLowerCase())
      return getAvatar(found)

    },
  },
  computed: {
    ...mapState(usePokerStore, ['allPlayers', 'chatVisible']),
    chatMessages() {
        return  reverse(get(usePokerStore().chatMessages, this.tableId, []))
    }
  },
  props: {
    tableId: {
      type: String
    }
  }
}
</script>

<style scoped>
.chat-container {
  position: absolute;
  width: 435px;
  height: 673px;
  right: 100px;
  bottom: 20px;

  z-index: 1000;
  background: #0D6757;
  /* Soft Blur */

  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.chat-header {
  font-family: 'Wonderbar';
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 18px;
  /* or 45% */

  display: flex;
  align-items: center;
  text-align: center;

  color: #FFFFFF;
}

.close-btn {
  left: 12px;
  position: absolute;
}
</style>
