<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppNavigation from './AppNavigation.vue'
</script>
<template>
  <AppHeader />
  <div class="w-full flex flex-col lg:flex-row content-height items-stretch">
    <AppNavigation />
    <slot />
  </div>
</template>
<style>
.content-height {
  min-height: calc(100dvh - 3.5rem);
}
</style>
