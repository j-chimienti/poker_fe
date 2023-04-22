<template>
  <q-form @submit="sendMessage" class="chat-message-form">
    <q-input v-model="msg" placeholder="Say something...">
      <template v-slot:append>
        <q-btn type="submit" label="send" @click="sendMessage"/>
      </template>
    </q-input>
  </q-form>
</template>
<script>
import {chatMessage} from "src/services/apiService";
import RouterMixin from "src/mixins/RouterMixin.vue";

export default {
  name: 'SendMessageForm',
  data() { return {msg: ''}},
  mixins: [RouterMixin],
  methods: {
    sendMessage() {
      if (this.msg) {
        chatMessage(this.msg, this.tableId)
        this.msg = ''
      }
    }
  }
}
</script>

<style>
.chat-message-form {
  position: absolute;
  left: 16px;
  right: 16px;
  top: 576px;
  bottom: 33px;
  color: black !important;
  background: #FFFFFF;
  mix-blend-mode: normal;
  padding-left: 15px;
  /* Rangoon Green

  Rangoon Green
  */
  border: 4px solid #141818;
  border-radius: 8px;
}

</style>
