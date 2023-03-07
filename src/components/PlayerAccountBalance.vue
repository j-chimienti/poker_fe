<template>
    <q-badge>
      <span v-if="balance !== null" :class="balanceKlass">{{balanceDisplay.toLocaleString()}}</span>
    </q-badge>
</template>

<script>
import gsap from "gsap"
export default {
  name: "PlayerAccountBalance",
  props: {
    balance: 0
  },
  mounted() {
    this.balanceDisplay = this.balance || 0
  },
  data() {
    return {
      balanceDisplay: this.balance || 0,
      balanceKlass: null,
    }
  },
  methods: {
    tweenNumber(old, newValue) {
      if (old === newValue) return null
      else {
        if (old === null) old = 0
        const counter = { var: old }
        const klass = newValue > old ? "text-green" : "text-red"
        this.balanceKlass = klass
        this.balanceDisplay = newValue

        gsap.to(counter, 2, {
          var: parseInt(newValue),
          onUpdate: () => {
            this.balanceDisplay = parseInt(counter.var)
          },
          onComplete: () => {
            this.balanceKlass = null
          },
        })
      }
    },
  },
  watch: {
    balance: function (newValue, oldValue) {
      this.tweenNumber(oldValue, newValue)
    },
  },
}
</script>

<style scoped></style>
