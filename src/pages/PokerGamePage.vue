<template>
  <div class="row justify-center">
    <q-btn @click="navigateToLobby" label="lobby" icon="arrow_left" color="secondary" />
    <div v-if="table">
      <div>
        <q-chip>{{table.title}}</q-chip>
        <q-chip>{{table.round}}</q-chip>
        <q-chip>hand:{{table.hand}}</q-chip>
        <q-chip>pot:{{table.pot}}</q-chip>
        <q-chip>players:{{Object.keys(table.pokerPlayers).length}}</q-chip>
        <q-chip color="yellow" v-if="countdownText">nextHandStart:{{countdownText}}</q-chip>
      </div>
    </div>
  </div>
  <div v-if="table">
    <BlackJackTableV2 />
    <div class="row justify-center" v-if="joinedTable && table && table.hand && table.hand !== 'WAITING'" >
    <q-btn-group >
      <q-btn @click="raise(table.id, 1000)" color="red" label="raise"/>
      <q-btn @click="call(table.id)" color="blue" label="call"/>
      <q-btn @click="fold(table.id)" color="grey" label="fold"/>
    </q-btn-group>
    </div>
  </div>
  <q-btn v-if="joinedTable" @click="onLeave(table.id)" color="red" label="leave"/>
  <q-btn v-else size="lg" @click="join(table.id)" color="green" label="join"/>
</template>

<script>
import BlackJackTableV2 from "components/BlackJackTableV2.vue"
import {usePokerStore} from "stores/poker-store";
import {join, leave, raise, fold, call, getTable, subscribeTable} from "src/services/apiService";
import {mapState} from "pinia";

export default {
  computed: {
    ...mapState(usePokerStore, ['table', 'joinedTable', 'round'])
  },
  data() {
    return { interval: null, countdownText: '' }
  },
  unmounted() { clearInterval(this.interval) },
 mounted() {
   this.interval = setInterval(this.handleCountdown, 1000)
 },
  methods: {
    handleCountdown() {
      const r = this.nextGameCountdown()
      this.countdownText = r
    },
    nextGameCountdown() {
      const table = this.table
      if (!(table && table.nextHandStart)) return null
      else {
        // Set the date we're counting down to
        var countDownDate = new Date(table.nextHandStart).getTime();
// Update the count down every 1 second

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        // const dateTimeDisplay = days + "d " + hours + "h "
        //   + minutes + "m " + seconds + "s ";

        const timeDisplay = `${seconds}s`

        // If the count down is finished, write some text
        if (distance <= 0) return null
        else return timeDisplay
      }
    },
    async navigateToLobby() {
      if (this.table) {
        try {
          leave(this.table.id)
        } catch (e) {
        }
      }
      return this.$router.push({name: 'home'})
    },
    onLeave(id) {
      leave(id)
      subscribeTable(id)
    },

    join,
    fold,
    leave,
    call,
    raise
  },

  components: {
    BlackJackTableV2
  }
}
</script>

<style scoped>



</style>
