<script>
import ApiMixin from "src/mixins/ApiMixin.vue"
import StoreMixin from "src/mixins/StoreMixin.vue"
import PlayerBalance from "components/PlayerBalance.vue"

export default {
  name: "PlayAnotherHandModal",
  components: { PlayerBalance },
  mixins: [ApiMixin, StoreMixin],
}
</script>

<template>
  <q-dialog v-model="playAnotherHandModalVisible">
    <q-card>
      <q-card-section>
        {{ balance }}
      </q-card-section>
      <q-card-section>
        <!--        todo: hardcode-->
        You will be removed from the room in 10s
      </q-card-section>
      <q-card-section>
        <q-btn @click="leave(room)">exit room={{ room }}</q-btn>
        <q-btn @click="join(room)">Play Another Hand</q-btn>
      </q-card-section>
      <q-card-section></q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
