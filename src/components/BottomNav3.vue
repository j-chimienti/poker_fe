<template>

  <div class="bottom-nav q-pt-sm">
    <div class="row flex flex-center q-py-sm">
      <div class="gt-xs" style="position: absolute; left: 0;">
        <div class="row">
          <PlayingForFreeToggle/>
          <BetInput/>
        </div>
      </div>
      <div class="row">
          <q-btn
            @click="betRequest()"
            push
            :disable="buttonsDisabled"
            color="accent"
            class="pointer"
            v-if="gameState === GAME_STATES.bet"
            label="deal"
            data-cy="dealBtn"
          />
          <div v-else>
            <q-btn
              push
              @click="hit()"
              label="hit"
              :disable="buttonsDisabled"
              icon="touch_app"
              class="q-mx-md"
              color="green"
              data-cy="hitBtn"
            />
            <q-btn
              push
              color="accent"
              @click="stand()"
              icon="do_not_touch"
              :disable="buttonsDisabled"
              label="stand"
              data-cy="standBtn"
            />
          </div>
      </div>
    </div>
    <div class="lt-sm row justify-start" style="min-height: 75px;">
      <div class="row flex" v-if="isBetting">
        <PlayingForFreeToggle/>
        <BetInput/>
      </div>
    </div>
  </div>
</template>

<script>
import StoreMixin from "../mixins/StoreMixin.vue"
import {useBlackjackStore} from "stores/blackjack-store"
import PlayingForFreeToggle from "components/PlayingForFreeToggle.vue";
import BetInput from "components/BetInput.vue";

export default {
  components: {BetInput, PlayingForFreeToggle },
  mixins: [StoreMixin],
  name: "BottomNav3",

  computed: {
    playingFor: {
      get() {
        return useBlackjackStore().playingFor
      },
      set(v) {
        useBlackjackStore().playingFor = v
        useBlackjackStore().bet = (v === "BTC") ? 100 : 0
      }
    }
  },
  methods: {


  },
}
</script>

<style scoped>
text {
  cursor: pointer;
}
.bottom-nav {
  background: url("../assets/BottomNav.png");
  background-size: cover;
}

.play_toggler {
  position: absolute;
  left: 5px;
  top: 40%;
}
</style>
