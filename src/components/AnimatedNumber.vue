<template>
  <div>{{ animatedNumber }}</div>
</template>

<script setup>
import { ref, watch, defineProps } from "vue"
import { gsap } from "gsap"
import { formatToUSD } from "../services/moneyUtils"

const props = defineProps({
  number: {
    type: Number,
    required: true,
  },
})

const animatedNumber = ref(props.number)

watch(
  () => props.number,
  (newValue) => {
    gsap.to(animatedNumber, {
      value: newValue,
      duration: 1,
      ease: "power1.out",
      onUpdate: () => {
        animatedNumber.value = gsap
          .getProperty(animatedNumber, "value")
          .toFixed(0)
      },
    })
  }
)
</script>
