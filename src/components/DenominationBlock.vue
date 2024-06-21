<script setup lang="ts">
import useSettings from '@/stores/settings.store'
import NavItem from './NavItem.vue'
import AddDenominationDialog from './AddDenominationDialog.vue'
import { ref } from 'vue'

const settings = useSettings()
const dialog = ref<InstanceType<typeof AddDenominationDialog>>()
const showDialog = () => dialog.value?.show()
</script>
<template>
  <NavItem title="Номиналы" :can-toggle="false">
    <div class="flex flex-row flex-wrap gap-2">
      <button
        class="bg-gray-200 p-1 aspect-square flex items-center justify-center rounded-full hover:bg-gray-300"
        @click="showDialog"
      >
        <span class="material-symbols-outlined">add</span>
      </button>
      <div
        v-for="denominal in settings.denominations"
        :key="denominal"
        class="px-2 py-1 rounded-md bg-gray-200 flex items-center gap-1"
      >
        {{ denominal }}

        <button
          class="h-6 w-6 cursor-pointer group"
          @click="settings.removeDenomination(denominal)"
        >
          <span class="material-symbols-outlined group-hover:text-gray-600"> delete </span>
        </button>
      </div>
    </div>
  </NavItem>

  <AddDenominationDialog ref="dialog" />
</template>
