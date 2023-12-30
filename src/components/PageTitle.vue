<script setup>
import {computed, watch} from "vue"
import {usePokerStore} from "stores/poker-store"

const myTurn = computed(() => usePokerStore().myTurn)
const original = document.title

watch(myTurn, function (n, o) {
  if (n) document.title = "your turn!"
  else document.title = original
})
</script>
