<template>
  <div class="header row">
          <img :src="logo" width="474"
               style="position: absolute; top: 27px; margin-left: 125px;"
               @click="$router.push({name: 'home'})"
               height="58"/>
    <div style="position: absolute;  top: 27px;  right: 28px;">
      <img  src="../assets/msg-home.png"
            @click="openChat"
            class="q-mr-md cursor-pointer"/>
      <img class="cursor-pointer" :src="account" @click="accountModalVisible = true"/>
    </div>
  </div>
</template>
<script>
import StoreMixin from "../mixins/StoreMixin.vue"
import logo from "../assets/logo.png"
import account from "../assets/account.png"
import {mapActions} from "pinia";
import {usePokerStore} from "stores/poker-store";

export default {
  name: "NavBar",
  data() { return { logo, account }},
 computed: {
   showTable() {
     return this.$route.name === "table"
   }
 },
  mixins: [StoreMixin],
  methods: {
    ...mapActions(usePokerStore, ['openChat']),
  }
}
</script>

<style>

.header {
  height: 112px;
  box-shadow: 0px 0px 22px 5px rgba(0, 0, 0, 0.5);

}

</style>
