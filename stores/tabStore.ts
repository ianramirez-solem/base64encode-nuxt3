import { defineStore } from 'pinia'

export const useTabStore = defineStore('tabStore', {
  state: () => ({
    tab: 0
  }),
  actions: {
    setTab(value: number) {
      this.tab = value
    }
  }
})
