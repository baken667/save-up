import { defineStore } from "pinia";

interface IStore {
    table: {
        day: number,
        amount: number
    }[]
}

const useTable = defineStore('table', {
    state: (): IStore => ({
        table: []
    }),
    actions: {
        setTable(table: IStore['table']) {
            this.table = table
        }
    },
})

export default useTable