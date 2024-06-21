import { defineStore } from 'pinia'
import _ from 'lodash'

interface IStore {
  denominations: number[]
  maxPercentage: number
  minPercentage: number
}

const useSettings = defineStore('settings', {
  state: (): IStore => ({
    denominations: [500, 1000, 2000, 5000, 10000],
    maxPercentage: 20,
    minPercentage: 5
  }),
  actions: {
    addDenomination(denomination: number) {
      if (_.includes(this.denominations, denomination)) {
        return
      }

      this.denominations.push(denomination)

      console.log(this.denominations)

      this.denominations = _.sortBy(this.denominations, (a) => a)

      return
    },
    removeDenomination(denomination: number) {
      if (!_.includes(this.denominations, denomination)) return

      _.remove(this.denominations, (a) => a === denomination)
    },
    setMaxPercentage(percents: number) {
      this.maxPercentage = percents
    },
    setMinPercentage(percents: number) {
      this.minPercentage = percents
    }
  },
  getters: {
    minDnm: (state): number | undefined => _.min(state.denominations),
    maxDnm: (state): number | undefined => _.max(state.denominations)
  }
})

export default useSettings
