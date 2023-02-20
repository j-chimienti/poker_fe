import {defineStore} from "pinia";

export const usePokerStore = defineStore("poker", {
  actions: {
    setTable(t) {
      this.table = t
      this.router.push({name: "table", params: {id: t.id}})
    }
  },
  state: () => {
    return {
      tables: [],
      table: null

    }
  },

})
