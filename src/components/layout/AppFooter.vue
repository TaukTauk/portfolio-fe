<template>
  <footer
    class="relative z-10 border-t px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4"
    :class="isDark ? 'border-white/5' : 'border-black/5'"
  >
    <div
      class="font-mono text-[13px] tracking-widest"
      :class="isDark ? 'text-[var(--text-muted)]' : 'text-[var(--text-muted)]'"
    >
      © 2025 Tauk Tauk Lin — Built with focus on architecture and performance.
    </div>
    <div class="flex items-center gap-6">
      <a
        v-for="link in footerLinks"
        :key="link.label"
        :href="link.href"
        target="_blank"
        class="font-mono text-[13px] tracking-widest uppercase no-underline transition-colors duration-200 flex items-center gap-2"
        :class="
          isDark
            ? 'text-[var(--text-muted)] hover:text-accent'
            : 'text-[var(--text-muted)] hover:text-accent'
        "
      >
        <v-icon :icon="link.icon" size="14" />
        {{ link.label }}
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)

const footerLinks = [
  { label: 'GitHub', href: 'https://github.com/TaukTauk', icon: 'mdi-github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/tauk-tauk-lin-60a157222', icon: 'mdi-linkedin' },
  { label: 'Email', href: 'mailto:tauktauk51833@gmail.com', icon: 'mdi-email-outline' },
]
</script>

<style scoped>
.text-accent {
  color: var(--accent);
}
.hover\:text-accent:hover {
  color: var(--accent);
}
</style>
