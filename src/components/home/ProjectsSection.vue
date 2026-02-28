<template>
  <section id="projects" class="relative z-10 py-32 px-6 md:px-12">
    <div class="max-w-[1100px] mx-auto">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div class="section-label mb-3">// Professional Projects</div>
          <h2 class="section-title">Production &amp; enterprise work</h2>
        </div>
        <div class="font-mono text-[13px] tracking-widest" style="color: var(--text-muted)">
          {{ professionalProjects.length }} projects
        </div>
      </div>

      <!-- Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-px"
        :class="isDark ? 'bg-white/5' : 'bg-black/5'"
      >
        <ProjectCard
          v-for="(project, i) in professionalProjects"
          :key="project.id"
          :project="project"
          :index="i"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { professionalProjects } from '@/data/projects'
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
