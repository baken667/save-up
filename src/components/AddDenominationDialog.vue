<script setup lang="ts">
import useSettings from '@/stores/settings.store'
import _ from 'lodash'
import { ref } from 'vue'

const dialog = ref<HTMLDialogElement>()
const visible = ref(false)
const denominal = ref<number>()
const settings = useSettings()

const showDialog = () => {
  console.log('hi')

  console.log(dialog.value)
  dialog.value?.showModal()
  visible.value = true
}

defineExpose({
  show: showDialog,
  close: () => dialog.value?.close(),
  visible: visible
})

function addDenomination() {
  if (!denominal.value) return

  if (_.includes(settings.denominations, denominal.value)) {
    alert('Такой номинал уже существует')
    return
  }

  settings.addDenomination(denominal.value)
  denominal.value = undefined
  dialog.value?.close()
}
</script>
<template>
  <dialog
    @close="visible = false"
    ref="dialog"
    class="bg-gray-100 shadow-xl overflow-hidden rounded-xl"
  >
    <div class="px-5 py-3 flex flex-col gap-2">
      <div class="flex justify-between flex-nowrap">
        <h3 class="font-bold">Добавить номинал</h3>
        <button>
          <div class="material-symbols-outlined" @click="dialog?.close()">close</div>
        </button>
      </div>
      <form @submit.prevent="addDenomination" class="flex">
        <input
          required
          type="number"
          placeholder="500"
          min="0"
          class="text-sm py-2 px-3 h-10 w-full outline-none ring-0 focus:outline-none focus:ring-0 appearance-none rounded-l-lg"
          v-model="denominal"
        />
        <button
          class="px-3 py-2 bg-white hover:bg-gray-50 text-sm h-10 border border-gray-300 rounded-r-lg"
          type="submit"
        >
          Добавить
        </button>
      </form>
    </div>
  </dialog>
</template>
