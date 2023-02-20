<template>
  <div>
    <TestData/>
    <InvoiceModal />
    <DebitModal />
    <LoginModal/>
    <div hidden>
      <img
        v-for="card in cardImages"
        :key="card.name + 'loading'"
        width="75"
        :src="card.image"
      />
    </div>
  <router-view />
  </div>
</template>

<script>
import {defineComponent} from "vue"
import {cardImages} from "./services/cardImageService.js"
import InvoiceModal from "components/InvoiceModal.vue";
import DebitModal from "components/DebitModal.vue";
import TestData from "components/TestData.vue";
import LoginModal from "./components/auth/LoginModal.vue";

export default defineComponent({
  name: "App",
  components: {LoginModal, TestData, DebitModal, InvoiceModal},
  data() {
    return { cardImages}
  }
})
</script>
