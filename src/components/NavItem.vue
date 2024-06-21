<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  title: string
  canToggle: boolean
}>()

const open = ref(props.canToggle ? false : true)
</script>
<template>
  <div class="flex flex-col divide-y">
    <button
      class="block px-3 py-2 w-full text-start outline-none"
      :class="[!canToggle ? '' : 'hover:bg-gray-100']"
      @click="open = !open"
      :disabled="!canToggle"
    >
      <h3 class="text-sm font-bold">{{ title }}</h3>
    </button>
    <div class="px-3 py-2" v-show="open">
      <slot />
    </div>
  </div>
</template>
