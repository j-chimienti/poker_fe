<template>
  <q-dialog v-model="accountModalVisible">
    <q-card>
      <q-card-section class="row flex-center">
        <q-btn flat round dense icon="close" v-close-popup />
        <div class="text-h3">account</div>
        <q-space />
      </q-card-section>
      <q-card-section>
        <div class="row flex-center">
          <div class="q-mr-sm">
            <q-avatar>
              <img :src="avatar" />
            </q-avatar>
          </div>
          <div v-if="!editingName" class="row flex-center">
            <div>{{ userName }}</div>
            <q-icon name="edit" @click="editUserName" />
          </div>
          <div v-else class="row flex-center">
            <q-input
              v-model="userName"
              label="Edit name"
              @blur="saveUserName"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <!-- Profile Picture with Edit Icon -->
        <!--        <div class="col-12">-->
        <!--          <q-avatar size="64px" v-if="!editingPic">-->
        <!--            <img :src="userProfilePic" alt="Profile picture" />-->
        <!--          </q-avatar>-->
        <!--          <q-file-->
        <!--            v-else-->
        <!--            v-model="userProfilePic"-->
        <!--            label="Select picture"-->
        <!--            @change="saveProfilePic"-->
        <!--          ></q-file>-->
        <!--          <q-icon name="edit" @click="editProfilePic" />-->
        <!--        </div>-->

        <!-- User Name and Edit Icon -->

        <div class="text-center">balance: {{ formatToUSD(balance) }}</div>

        <!-- Account Balance -->
        <!--        <div class="col-12">-->
        <!--          <div>{{ formatToUSD(balance) }}</div>-->
        <!--        </div>-->
      </q-card-section>
      <q-card-section class="column">
        <q-btn
          @click="onClick"
          class="q-mb-sm"
          color="secondary"
          label="login"
        ></q-btn>
        <q-btn @click="onClick" color="secondary" label="signup"></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from "vue"
import { useUiStore } from "stores/ui-store"
import { useAuthStore } from "src/auth/auth-store"
import { usePokerStore } from "stores/poker-store"
import { changeName } from "src/services/apiService"
import { formatToUSD } from "src/services/moneyUtils"

const uiStore = useUiStore()
const authStore = useAuthStore()

const userName = ref(authStore.name)
const balance = computed(() => usePokerStore().balance)
const name = computed(() => authStore.name)
const avatar = computed(() => authStore.avatar)

const accountModalVisible = computed({
  get: () => uiStore.accountModalVisible,
  set: (value) => (uiStore.accountModalVisible = value),
})

const onClick = () => {
  uiStore.toggleModal("accountModalVisible", false)
  uiStore.toggleModal("loginModalVisible", true)
}

const editingName = ref(false)
const editingPic = ref(false)

const editProfilePic = () => {
  editingPic.value = true
}

const saveProfilePic = () => {
  editingPic.value = false
  // todo: logic to handle profile picture change
}

const editUserName = () => {
  editingName.value = true
}

const saveUserName = () => {
  if (userName.value) {
    editingName.value = false
    changeName(userName.value)
  }
  // Additional logic to handle user name change
}
</script>

<style scoped></style>
