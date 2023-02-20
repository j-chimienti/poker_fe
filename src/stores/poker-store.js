import {defineStore} from "pinia";

export const userPokerStore = defineStore("poker", {
  state: () => {
    return {
      tables: [],
      table: null

    }
  },

})
