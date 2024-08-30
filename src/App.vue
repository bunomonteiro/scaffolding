<script setup>
import Breakpoint from '@/components/Breakpoint.vue';
import ThemeSwitcher from './components/ThemeSwitcher.vue';

let isDevelopment = (/development/i).test(import.meta.env.MODE)
</script>

<template>
  <Breakpoint v-if="isDevelopment" />
  <ThemeSwitcher v-if="isDevelopment" />
  <div class="h-full w-full min-h-screen min-w-screen bg-neutral-300 dark:bg-neutral-800">
    <RouterView />
  </div>
  <Toast></Toast>
</template>

<style scoped></style>
