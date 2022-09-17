import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  // other options...
  state: () => ({
    word: '',
    curfile: null,
    curobj: null,
    mazi: null
  }),
  getters: {
  },
  actions: {
    setfile (data) {
      this.curfile = data
    },
    setobj (data) {
      this.curobj = data
    },
    setmazi (data) {
      this.mazi = data
    },
    setword (data) {
      this.word = data
    }
  }
})