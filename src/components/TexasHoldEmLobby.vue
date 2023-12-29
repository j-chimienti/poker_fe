<template>
  <NavBar />
  <ChatMessages table-id="lobby" />
  <div class="q-container">
    <div class="row justify-start wrap">
      <div
        v-for="table in rows"
        :key="table.id"
        class="game-card q-pa-md q-ma-md"
      >
        <div class="text-title text-center q-mb-lg">{{ table.name }}</div>
        <div class="row justify-between q-my-lg">
          <div class="game-text">
            <div class="row full-height text-secondary">
              {{ table.playersCount }} players online
            </div>
            <div class="row full-height">
              <span>{{ table.players }}</span>
              <span>{{ table.stakes }}</span>
            </div>
          </div>
          <q-btn @click="joinTable(table.id)" label="join" class="join-btn" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {usePokerStore} from "stores/poker-store"
import {formatToUSD} from "src/services/moneyUtils"
import NavBar from "components/NavBar.vue"
import ChatMessages from "components/ChatMessages.vue"
import {useRouter} from "vue-router"
import {computed} from "vue"

const pokerStore = usePokerStore()
const router = useRouter()

const tables = computed(() => pokerStore.tables)
const rows = computed(() =>
  tables.value.map((table) => ({
    ...table,
    playersCount: Object.keys(table.pokerPlayers).length,
    stakes: `${formatToUSD(table.config.bet.min)} / ${formatToUSD(
      table.config.bet.min * 2
    )}`,
    players: `${table.config.players.min} / ${table.config.players.max}`,
  }))
)

const joinTable = (id) => {
  router.push({ name: "table", params: { id } })
}
</script>

<style scoped>
.text-title {
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 52px;
}

.game-card {
  width: 413px;
  /* Box Shadows / Dark */
  box-shadow: 0px 0px 22px 5px rgba(0, 0, 0, 0.5);
}

.game-text {
  font-family: "Lato";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
}
</style>
