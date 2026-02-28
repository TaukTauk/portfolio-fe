<template>
  <div
    class="relative overflow-hidden p-7 transition-all duration-300 group"
    :class="isDark ? 'bg-[var(--bg-card)]' : 'bg-white'"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <!-- Corner accent -->
    <div
      class="absolute top-0 right-0 w-8 h-8 transition-all duration-300"
      :style="{
        background: hovered ? 'var(--accent-dim)' : 'transparent',
        clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
      }"
    />

    <!-- Category label -->
    <div
      class="font-mono text-[12px] tracking-[0.2em] uppercase mb-5 flex items-center gap-2 transition-colors duration-300"
      :class="hovered ? 'text-accent' : ''"
      style="color: var(--accent)"
    >
      <v-icon :icon="category.icon" size="13" />
      {{ category.name }}
    </div>

    <!-- Tags -->
    <div class="flex flex-wrap gap-2">
      <span
        v-for="tag in category.tags"
        :key="tag"
        class="stack-tag font-mono text-[13px] px-3 py-1 border transition-all duration-200 cursor-default"
        :class="
          isDark
            ? 'border-white/8 text-[var(--text-secondary)]'
            : 'border-black/8 text-[var(--text-secondary)]'
        "
      >
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

defineProps<{
  category: {
    name: string
    icon: string
    tags: string[]
  }
}>()

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)
const hovered = ref(false)
</script>

<style scoped>
.text-accent {
  color: var(--accent);
}

.stack-tag:hover {
  border-color: var(--accent);
  color: var(--accent);
}
</style>
