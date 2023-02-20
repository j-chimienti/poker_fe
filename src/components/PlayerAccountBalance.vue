<template>
  <div>
    <q-badge>
      <q-icon name="img:/btc.svg"/>
      <span v-if="balance !== null" :class="balanceKlass">{{balanceDisplay.toLocaleString()}}</span>
    </q-badge>
  </div>
</template>

<script>
import gsap from "gsap"
import StoreMixin from "../mixins/StoreMixin.vue"

export default {
  name: "PlayerAccountBalance",
  mixins: [StoreMixin],
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
