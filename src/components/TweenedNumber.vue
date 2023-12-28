<template>
  <span v-if="balance !== null" :class="balanceKlass">{{
    balanceDisplay.toLocaleString()
  }}</span>
</template>

<script setup>
import { ref, watch, onMounted } from "vue"
import gsap from "gsap"

const props = defineProps({
  balance: {
    type: Number,
    default: 0,
  },
})

const balanceDisplay = ref(props.balance)
const balanceKlass = ref(null)

const tweenNumber = (old, newValue) => {
  if (old === newValue) return
  if (old === null) old = 0
  const counter = { var: old }
  balanceKlass.value = newValue > old ? "text-green" : "text-red"

  gsap.to(counter, 2, {
    var: parseInt(newValue),
    onUpdate: () => {
      balanceDisplay.value = parseInt(counter.var)
    },
    onComplete: () => {
      balanceKlass.value = null
    },
  })
}

watch(
  () => props.balance,
  (newValue, oldValue) => {
    tweenNumber(oldValue, newValue)
  }
)

onMounted(() => {
  balanceDisplay.value = props.balance
})
</script>

<style scoped></style>
