<template>
  <q-form @submit="sendMessage" class="z-max">
    <q-input v-model="msg" outlined>
      <template v-slot:append>
        <q-btn type="submit" icon="send" color="info" @click="sendMessage"/>
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
      chatMessage(this.msg, this.tableId)
      this.msg = ''

    }
  }
}
</script>
