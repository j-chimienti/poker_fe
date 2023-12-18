<template>
  <div>
    <TestData />
    <LoginModal />
    <AccountInfoModal />
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
import { defineComponent } from "vue"
import { cardImages } from "./services/cardImageService.js"
import TestData from "components/TestData.vue"
import LoginModal from "components/auth/LoginModal.vue"
import AccountInfoModal from "components/auth/AccountInfoModal.vue"
import DialogMixin from "src/mixins/DialogMixin.vue"

export default defineComponent({
  name: "App",
  mixins: [DialogMixin],
  components: { AccountInfoModal, LoginModal, TestData },
  data() {
    return { cardImages }
  },
})
</script>
