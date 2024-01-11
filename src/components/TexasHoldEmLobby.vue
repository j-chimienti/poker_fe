<template>
  <NavBar />
  <ChatMessages table-id="lobby" />
  <div class="q-container">
    <div class="row justify-start wrap q-ma-md">
      <TransitionGroup @enter="enterAnimation">
        <div v-for="table in rows" :key="table.id">
          <TableCard :table="table" />
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { usePokerStore } from "stores/poker-store"
import { formatToUSD } from "src/services/moneyUtils"
import NavBar from "components/NavBar.vue"
import ChatMessages from "components/ChatMessages.vue"
import { useRouter } from "vue-router"
import { computed } from "vue"
import TableCard from "components/TableCard.vue"

const pokerStore = usePokerStore()
const router = useRouter()

const tables = computed(() => pokerStore.tables)
const rows = computed(() =>
  tables.value.map((table) => ({
    ...table,
    playersCount: Object.keys(table.pokerPlayers).length,
    stakes: `${formatToUSD(table.config.bet.min)}/${formatToUSD(
      table.config.bet.min * 2
    )}`,
    players: `${table.config.players.min}/${table.config.players.max}`,
  }))
)

import { gsap } from "gsap"

function enterAnimation(el, done) {
  gsap.fromTo(
    el,
    { opacity: 0, y: -30 },
    { opacity: 1, y: 0, duration: 0.5, onComplete: done }
  )
}
</script>

<style scoped></style>
