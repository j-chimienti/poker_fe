<template>
  <q-card>
    <q-card-section>
      <div class="text-h4">{{ table.name }}</div>
    </q-card-section>
    <q-card-section> {{ table.playersCount }} players online </q-card-section>
    <q-card-actions>
      <q-btn
        @click="goToTable(table.id)"
        label="go"
        icon="pageview"
        class="join-btn"
      />
    </q-card-actions>
  </q-card>
</template>
<script setup>
import { pages } from "src/constants"
import { useRouter } from "vue-router"

const router = useRouter()

const props = defineProps({
  table: {
    type: Object,
    required: true,
  },
})

const goToTable = (id) => {
  router.push({ name: pages.table, params: { id } })
}
</script>
<style scoped></style>
