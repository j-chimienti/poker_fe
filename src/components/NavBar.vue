<template>
  <q-header class="bg-transparent q-pa-md q-ma-md">
    <q-toolbar class="flex justify-between">
        <div class="flex justify-start">
          <img :src="logo"/>
        </div>
      <TableInfo v-if="showTable"/>
      <div v-else class="text-h2"></div>
      <div></div>
<!--      <img :src="msg"/>-->
      <img class="cursor-pointer" :src="account"  @click="loginModalVisible = true"/>
    </q-toolbar>
  </q-header>
</template>
<script>
import StoreMixin from "../mixins/StoreMixin.vue"
import TableInfo from "pages/TableInfo.vue";
import logo from "../assets/logo.png"
import msg from "../assets/msg.png"
import account from "../assets/account.png"
export default {
  name: "NavBar",
  components: {TableInfo},
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

</style>
