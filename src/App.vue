<template>
  <div :class="themeStore.isDark ? 'theme-dark' : 'theme-light'">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
const themeStore = useThemeStore()
</script>