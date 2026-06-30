<template>
  <section id="opensource" class="relative z-10 py-32 px-6 md:px-12">
    <div class="max-w-[1100px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div class="section-label mb-3">// Open Source</div>
          <h2 class="section-title">Public work</h2>
        </div>
        <div class="text-right">
          <div class="font-mono text-[13px] tracking-widest mb-1" style="color: var(--text-muted)">
            {{ openSourceProjects.length }} {{ openSourceProjects.length === 1 ? 'project' : 'projects' }}
          </div>
          <div class="font-mono text-[11px] tracking-widest uppercase" style="color: var(--text-muted)">
            MIT Licensed
          </div>
        </div>
      </div>

      <!-- Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-px"
        :class="isDark ? 'bg-white/5' : 'bg-black/5'"
      >
        <ProjectCard
          v-for="(project, i) in openSourceProjects"
          :key="project.id"
          :project="project"
          :index="i"
        />
      </div>

      <!-- Footer note -->
      <div
        class="flex items-center gap-2 mt-8 font-mono text-[12px] tracking-widest"
        style="color: var(--text-muted)"
      >
        <v-icon icon="mdi-source-branch" size="13" />
        Available on PyPI · Source on GitHub
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { openSourceProjects } from '@/data/projects'
import ProjectCard from '@/components/ui/ProjectCard.vue'

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
