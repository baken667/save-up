<script setup lang="ts">
import type { InputHTMLAttributes, PropType } from 'vue'

defineProps({
  type: {
    type: String as PropType<InputHTMLAttributes['type']>,
    default: 'text'
  },
  label: {
    type: String,
    required: true
  }
})

const model = defineModel()
</script>
<template>
  <label class="flex flex-col gap-1">
    <span class="text-sm font-bold">{{ label }}</span>
    <input :type="type" v-model="model" class="rounded-md py-1 px-2" v-bind="$attrs" />
  </label>
</template>
