<script setup lang="ts">
import { ref, watch } from 'vue'
import useTable from '@/stores/table.store'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import _ from 'lodash'

const tableStore = useTable()
const matrixTable = ref<number[][]>([])

watch(
  () => tableStore.table,
  (val) => {
    if (val.length === 0) return
    const doc = new jsPDF('landscape', 'pt', 'A4')
    const amounts = val.map((item) => item.amount)
    const matrix = _.chunk(amounts, 10)
    matrixTable.value = matrix
    const body = []

    matrix.forEach((row, i) => {
      const rowsToInsert: { content: number; styles: { valign: string; halign: string } }[] = []
      row.forEach((col, j) => {
        const item = matrix[i][j]

        rowsToInsert.push({
          content: item,
          styles: {
            valign: 'middle',
            halign: 'center'
          }
        })
      })

      body.push(rowsToInsert)
    })

    autoTable(doc, {
      body: matrix,
      theme: 'grid'
    })

    console.log('hi')

    doc.save('save-up.pdf')
  }
)
</script>
<template>
  <div class="flex flex-col gap-4 items-center justify-center grow">
    <h2 class="text-xl font-bold">{{ _.sumBy(tableStore.table, (item) => item.amount) }}</h2>
    <table class="text-lg table-auto border-collapse">
      <tr
        v-for="(row, i) in matrixTable"
        :key="`row-${i}`"
        class="border-b border-gray-400 first:border-t"
      >
        <td
          v-for="(item, j) in row"
          :key="`col-${j}`"
          class="border-l border-gray-400 last:border-r px-2 py-1"
        >
          {{ item }}
        </td>
      </tr>
    </table>
  </div>
</template>
