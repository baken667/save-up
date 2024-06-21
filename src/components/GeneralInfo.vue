<script setup lang="ts">
import { reactive } from 'vue'
import DefaultInput from './DefaultInput.vue'
import NavItem from './NavItem.vue'
import GenerateSavingPlan from '@/lib/generate-saving-plan'
import useSettings from '@/stores/settings.store'
import useTable from '@/stores/table.store'

const tableStore = useTable()
const formData = reactive<{
  total: number
  parts: number
  maxPerPart?: number
  minPerPart?: number
}>({
  total: 100000,
  parts: 30,
  maxPerPart: undefined,
  minPerPart: undefined
})
const settings = useSettings()

function submitForm() {
  const table = GenerateSavingPlan(
    formData.total,
    settings.denominations,
    formData.minPerPart,
    formData.maxPerPart,
    formData.parts
  )

  tableStore.setTable(table)
}
</script>
<template>
  <NavItem title="Основное" :can-toggle="false">
    <form ref="formBlock" @submit.prevent="submitForm">
      <div class="flex flex-col gap-4">
        <DefaultInput
          v-model="formData.total"
          label="Общая сумма *"
          type="number"
          min="0"
          required
          placeholder="100000"
        />
        <DefaultInput
          v-model="formData.parts"
          label="Количество частей *"
          type="number"
          min="0"
          required
          placeholder="100"
        />
        <DefaultInput
          v-model="formData.maxPerPart"
          label="Максимальная сумма за часть"
          type="number"
          min="0"
          placeholder="100000"
        />
        <DefaultInput
          v-model="formData.minPerPart"
          label="Минимальная сумма за часть"
          type="number"
          min="0"
          placeholder="100000"
        />
      </div>
      <div class="mt-2">
        <button
          class="bg-indigo-500 text-white rounded-md px-2 py-1 hover:bg-indigo-600"
          type="submit"
        >
          Сгенерировать
        </button>
      </div>
    </form>
  </NavItem>
</template>
