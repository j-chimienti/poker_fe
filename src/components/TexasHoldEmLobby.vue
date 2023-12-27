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

<script>
import { usePokerStore } from "stores/poker-store"
import { mapState } from "pinia"
import { formatToUSD } from "src/services/moneyUtils"
import NavBar from "components/NavBar.vue"
import ChatMessages from "components/ChatMessages.vue"

export default {
  components: { ChatMessages, NavBar },
  methods: {
    joinTable(id) {
      return this.$router.push({ name: "table", params: { id } })
    },
  },
  computed: {
    ...mapState(usePokerStore, ["tables"]),
    rows() {
      // todo: avg pot
      return this.tables.map((t) => {
        const playersCount = Object.keys(t.pokerPlayers).length
        const stakes = `${formatToUSD(t.config.bet.min)} / ${formatToUSD(
          t.config.bet.min * 2
        )}`
        const players = `${t.config.players.min} / ${t.config.players.max}`
        return Object.assign({}, t, { stakes, players, playersCount })
      })
    },
    columns() {
      return [
        { name: "name", field: "name", label: "Name" },
        { name: "stakes", field: "stakes", label: "Stakes" },
        { name: "players", field: "players", label: "Players" },
      ]
    },
  },
  mounted() {},
  unmounted() {},
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
