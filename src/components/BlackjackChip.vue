<template>
  <div class="chip" ref="chip"><span class="bbb">100$</span></div>
</template>

<script>
import StoreMixin from "src/mixins/StoreMixin.vue";

export default {
  name: "BlackjackChip",
  mixins: [StoreMixin],
  mounted() {
    this.enter()
  },
  methods: {
    enter() {
      this.$gsap.fromTo(this.$refs.chip,{
        x: '50vw',
        y: '100vw'
      }, {
        x: '50vw',
        y: '-100vh',
        duration: 1,
      })

    }
  },
  watch: {
    gameState: function (n, o) {
      this.enter()
    }
  }
}
</script>

<style scoped>
.chip {
  background-color: #073d91;
  height: 140px;
  width: 140px;
  border-radius: 50%;
  border: 7px dashed white;
  transition: all 1s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: 'Lato', sans-serif;
  font-size: 26px;
  margin: 0px 8px;
}

.bbb {
  border: 3px dashed white;
  height: 120px;
  width: 120px;
  border-radius: 50%;
  text-align: center;
  line-height: 120px;
}

/*!* .spin *! .container div:hover {*/
/*              transform: rotate(360deg);*/
/*            }*/

</style>
