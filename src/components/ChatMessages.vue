<template>
  <div class="chat-container">

  <div style="max-height: 400px; overflow-y: scroll; overflow-x: hidden">
    <div style="width: 100%; max-width: 400px">
      <q-chat-message v-for="message in chatMessages" :key="message"
                      :name="message.playerName"
                      :avatar="getPlayerInfo(message.playerName)"
                      :text="[message.message]"
      />
    </div>
  </div>

  </div>
</template>

<script>
import {usePokerStore} from "stores/poker-store";
import {get, reverse} from 'lodash';
import {mapState} from "pinia";
import {getAvatar} from "src/services/avatarService";

export default {
  methods: {
    getPlayerInfo(playerName) {
      const found = this.allPlayers.find(p => p.name.toLowerCase() === playerName.toLowerCase())
      return getAvatar(found)

    },
  },
  computed: {
    ...mapState(usePokerStore, ['allPlayers']),
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
/*.chat-container {*/
/*  position: relative;*/
/*  bottom: 0;*/
/*  left: 40px;*/
/*  max-width: 400px;*/
/*}*/
</style>
