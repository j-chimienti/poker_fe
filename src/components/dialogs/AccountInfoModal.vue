<template>
  <q-dialog v-model="accountModalVisible">
    <q-card>
      <q-card-section>
        <q-img
          class="cursor-pointer"
          src="src/assets/close-icon.png"
          width="56px"
          height="56px"
          v-close-popup
        />
      </q-card-section>
      <q-card-section>
        <div class="text-h3 text-center">account</div>
        <div class="row flex-center">
          <div>
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

        <div class="text-center">${{ formatToUSD(balance) }}</div>

        <!-- Account Balance -->
        <!--        <div class="col-12">-->
        <!--          <div>{{ formatToUSD(balance) }}</div>-->
        <!--        </div>-->
      </q-card-section>
      <q-card-section>
        <q-btn @click="onClick" class="login-btn" label="login"></q-btn>
      </q-card-section>
      <q-card-section>
        <q-btn @click="onClick" class="login-btn" label="signup"></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {computed, ref} from "vue"
import {useUiStore} from "stores/ui-store"
import {useAuthStore} from "src/auth/auth-store"
import {usePokerStore} from "stores/poker-store"
import {changeName} from "src/services/apiService"
import {formatToUSD} from "../../services/moneyUtils"

const uiStore = useUiStore()
const authStore = useAuthStore()

const userName = ref(authStore.name)
const userProfilePic = ref(authStore.picture)
const balance = computed(() => usePokerStore().balance)

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
  editingName.value = false
  changeName(userName.value)
  // Additional logic to handle user name change
}

const name = computed(() => authStore.name)
const avatar = computed(() => authStore.avatar)
</script>

<style scoped>
.account-popup {
  width: 446px;
  height: 351px;

  /* Box Shadows / Dark */

  box-shadow: 0px 0px 22px 5px rgba(0, 0, 0, 0.5);
  border-radius: 22px;
}
.login-btn {
  width: 338px;
  height: 48px;
  /* Mango Orange */

  background: #ff7a41;
  box-shadow: -3px 3px 0px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
</style>
