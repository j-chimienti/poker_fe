<template>
  <q-drawer
    dark
    v-model="rightDrawerOpen"
    side="left"
    :mini="miniState"
    @mouseover="miniState = false"
    @mouseout="miniState = true"
    show-if-above
    :width="300"
    :breakpoint="500"
  >
    <!-- drawer content -->
    <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
      <div class="absolute-bottom bg-transparent">
        <q-avatar size="56px" class="q-mb-sm">
          <img :src="isSessionUser ? 'https://cdn.quasar.dev/img/boy-avatar.png' : picture">
        </q-avatar>

        <PlayerAccountBalance class="text-weight-bold"/>
        <div>{{isSessionUser ? "anon" : email}}</div>
      </div>
    </q-img>
    <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px">
      <q-list padding data-cy="drawerList">
        <q-item >
          <q-item-section avatar>
            <q-icon name="img:/ln.svg"/>
          </q-item-section>
          <q-item-section>
            <CreateInvoice v-if="!invoice || invoiceIsExpired" />
            <LightningInvoice v-if="invoice" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon name="currency_bitcoin"/>
          </q-item-section>
          <q-item-section>
            <DebitForm />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon name="login"/>
          </q-item-section>
          <q-item-section>
            <q-btn push dense rounded v-if="authenticated && !isSessionUser" label="logout" @click="logout" />
            <SignupButton v-else/>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import StoreMixin from "../mixins/StoreMixin.vue"
import DebitForm from "./DebitForm.vue"
import CreateInvoice from "./CreateInvoice.vue"
import LightningInvoice from "./LightningInvoice.vue"
import SignupButton from "./SignupButton.vue"
import PlayerAccountBalance from "components/PlayerAccountBalance.vue";

export default {
  name: "AppDrawer",
  data() {
    return {
      miniState: true
    }
  },
  components: {PlayerAccountBalance, SignupButton, LightningInvoice, CreateInvoice, DebitForm },
  mixins: [StoreMixin],
}
</script>

<style scoped>
.q-overline {
  color: white;
}
</style>
