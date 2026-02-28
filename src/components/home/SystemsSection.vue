<template>
  <section id="systems" class="relative z-10 py-32 px-6 md:px-12">
    <div class="max-w-[1100px] mx-auto">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div class="section-label mb-3">// Systems &amp; Infrastructure</div>
          <h2 class="section-title">Low-level &amp; infrastructure depth</h2>
        </div>
        <div
          class="font-mono text-[13px] leading-relaxed max-w-xs text-right hidden md:block"
          style="color: var(--text-muted)"
        >
          Projects from 42 School demonstrating<br />
          systems-level engineering beyond<br />
          typical web development.
        </div>
      </div>

      <!-- Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-px"
        :class="isDark ? 'bg-white/5' : 'bg-black/5'"
      >
        <SystemCard v-for="project in systemsProjects" :key="project.id" :project="project" />
      </div>

      <!-- Bottom note -->
      <div
        class="mt-8 pt-8 border-t font-mono text-[13px] tracking-wide flex items-center gap-3"
        :class="isDark ? 'border-white/5' : 'border-black/5'"
        style="color: var(--text-muted)"
      >
        <v-icon icon="mdi-school-outline" size="14" style="color: var(--accent); opacity: 0.7" />
        These projects were completed at 42 School — a peer-to-peer engineering school with a
        project-based curriculum and no traditional lectures.
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { systemsProjects } from '@/data/projects'
import SystemCard from '@/components/ui/SystemCard.vue'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)
</script>

<style scoped>
.section-label {
  font-family: var(--mono);
  font-size: 14px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
}
.section-title {
  font-family: var(--display);
  font-size: clamp(26px, 3.5vw, 40px);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.1;
}
</style>
