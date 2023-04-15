<template>
  <div class="header row">
          <img :src="logo" width="474"
               style="position: absolute; top: 27px; margin-left: 125px;"
               @click="$router.push({name: 'home'})"
               height="58"/>
    <div style="position: absolute;  top: 27px;  right: 28px;">
      <img :src="msg" class="q-mr-md"/>
      <img class="cursor-pointer" :src="account" @click="loginModalVisible = true"/>
    </div>
  </div>
</template>
<script>
import StoreMixin from "../mixins/StoreMixin.vue"
import logo from "../assets/logo.png"
import msg from "../assets/msg.png"
import account from "../assets/account.png"
export default {
  name: "NavBar",
  data() { return { logo, msg, account }},
 computed: {
   showTable() {
     return this.$route.name === "table"
   }
 },
  mixins: [StoreMixin],
}
</script>

<style>

.header {
  height: 112px;
  box-shadow: 0px 0px 22px 5px rgba(0, 0, 0, 0.5);

}

</style>
