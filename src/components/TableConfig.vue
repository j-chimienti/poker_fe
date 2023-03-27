<template>
  <q-btn icon="settings"  flat @click="alert = true" />

  <q-dialog v-model="alert">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-center">Game Settings</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-list>
          <q-item>
            <q-item-section>Buy In:</q-item-section>
            <q-item-section>{{table.config.buyIn}}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Players:</q-item-section>
            <q-item-section>{{table.config.players.min}} - {{table.config.players.max}}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Small Blind:</q-item-section>
            <q-item-section>{{table.config.bet.min}}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Big Blind:</q-item-section>
            <q-item-section>{{table.config.bet.min * 2}}</q-item-section>
          </q-item>
<!--          <q-item>-->
<!--            <q-item-section>Rake:</q-item-section>-->
<!--            <q-item-section>{{table.rake}}</q-item-section>-->
<!--          </q-item>-->
          <q-item>
            <q-item-section>Move Timeout:</q-item-section>
            <q-item-section>{{table.config.moveTimeout}} seconds</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Auto Start Game:</q-item-section>
            <q-item-section>{{table.config.autoStartGame}} seconds</q-item-section>
          </q-item>

        </q-list>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="secondary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {ref} from 'vue'
import {usePokerStore} from "stores/poker-store";
export default {
 setup() {
   return {
     alert: ref(false),
     table: usePokerStore().table
   }
 }
}
</script>

<style scoped>

</style>
