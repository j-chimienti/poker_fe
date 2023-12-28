<template>
  <div>
    <q-form @submit.prevent="updateName">
      <q-input type="text" v-model="newName" required>
        <template v-slot:append>
          <q-btn
            type="submit"
            label="change name"
            color="secondary"
            @click="updateName"
          />
        </template>
      </q-input>
    </q-form>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { changeName } from "src/services/apiService"

const newName = ref("")

const updateName = () => {
  changeName(newName.value)
}
</script>
