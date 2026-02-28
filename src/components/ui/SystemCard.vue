<template>
  <div
    class="system-card group relative overflow-hidden cursor-pointer transition-all duration-300"
    :class="isDark ? 'bg-[var(--bg-card)]' : 'bg-white'"
    @click="$router.push(project.route)"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <!-- Animated background fill on hover -->
    <div
      class="absolute inset-0 transition-opacity duration-500 pointer-events-none"
      :style="{
        background: `radial-gradient(ellipse at top left, var(--accent-dim) 0%, transparent 70%)`,
        opacity: hovered ? 1 : 0,
      }"
    />

    <div class="relative z-10 p-8">
      <!-- Icon + lang row -->
      <div class="flex items-start justify-between mb-6">
        <div
          class="flex items-center justify-center w-10 h-10 border transition-all duration-300"
          :class="[
            hovered
              ? 'border-accent bg-[var(--accent-dim)] text-accent'
              : isDark
                ? 'border-white/10 text-[var(--text-muted)]'
                : 'border-black/10 text-[var(--text-muted)]',
          ]"
        >
          <v-icon :icon="project.icon || 'mdi-code-braces'" size="18" />
        </div>

        <div class="flex flex-col items-end gap-1">
          <span
            :class="[
              'status-badge font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-1',
              statusClass,
            ]"
          >
            {{ project.statusLabel }}
          </span>
          <span
            class="font-mono text-[12px] tracking-[0.1em]"
            style="color: var(--accent); opacity: 0.7"
          >
            {{ project.lang }}
          </span>
        </div>
      </div>

      <!-- Name -->
      <h3
        class="font-bold mb-2 transition-colors duration-300"
        style="font-family: var(--display); font-size: 20px"
        :class="hovered ? 'text-accent' : 'text-[var(--text-primary)]'"
      >
        {{ project.name }}
      </h3>

      <!-- Tagline -->
      <div class="font-mono text-[13px] mb-4 tracking-wide" style="color: var(--text-muted)">
        {{ project.tagline }}
      </div>

      <!-- Description -->
      <p class="text-[14px] leading-relaxed mb-6" style="color: var(--text-secondary)">
        {{ project.desc }}
      </p>

      <!-- Feature bullets -->
      <ul class="mb-6 space-y-2">
        <li
          v-for="point in project.features.slice(0, 4)"
          :key="point"
          class="flex items-start gap-2 text-[13px] leading-relaxed"
          style="color: var(--text-muted)"
        >
          <span style="color: var(--accent); opacity: 0.5; flex-shrink: 0; margin-top: 1px">▸</span>
          {{ point }}
        </li>
      </ul>

      <!-- Tech tags -->
      <div class="flex flex-wrap gap-2 mb-6">
        <span
          v-for="tech in project.stack.slice(0, 4)"
          :key="tech"
          class="font-mono text-[12px] px-2 py-1 border transition-all duration-200"
          :class="
            isDark
              ? 'border-white/8 text-[var(--text-muted)]'
              : 'border-black/8 text-[var(--text-muted)]'
          "
        >
          {{ tech }}
        </span>
      </div>

      <!-- CTA row -->
		<div class="flex items-center justify-between pt-4 border-t" :class="isDark ? 'border-white/5' : 'border-black/5'">
		  <div
		    class="flex items-center font-mono text-[13px] tracking-wide transition-all duration-300 cursor-pointer"
		    :class="hovered ? 'text-accent gap-3' : 'gap-2 text-[var(--text-muted)]'"
		    @click.stop="$router.push(project.route)"
		  >
		    <v-icon icon="mdi-arrow-right" size="14" />
		    View Details
		  </div>

		  <div class="flex items-center gap-2">
		    <!-- External link button -->
		    <a
		      v-if="project.link"
		      :href="project.link"
		      target="_blank"
		      class="flex items-center justify-center w-8 h-8 border transition-all duration-300 hover:border-accent hover:text-accent"
		      :class="isDark ? 'border-white/8 text-[var(--text-muted)]' : 'border-black/8 text-[var(--text-muted)]'"
		      :title="project.link.includes('github') ? 'View on GitHub' : 'Visit site'"
		      @click.stop
		    >
		      <v-icon
		        :icon="project.link.includes('github') ? 'mdi-github' : 'mdi-open-in-new'"
		        size="14"
		      />
		    </a>

		    <!-- Detail arrow -->
		    <div
		      class="flex items-center justify-center w-8 h-8 border transition-all duration-300"
		      :class="[
		        hovered
		          ? 'border-accent bg-[var(--accent-dim)] text-accent'
		          : isDark ? 'border-white/8 text-[var(--text-muted)]' : 'border-black/8 text-[var(--text-muted)]'
		      ]"
		    >
		      <v-icon icon="mdi-arrow-top-right" size="14" />
		    </div>
		  </div>
		</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useThemeStore } from '@/stores/theme'
import type { Project } from '@/data/projects'

const props = defineProps<{
  project: Project
}>()

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)
const hovered = ref(false)

const statusClass = computed(() => {
  switch (props.project.status) {
    case 'system':
      return 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
    case 'infrastructure':
      return 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
    default:
      return 'bg-[var(--accent-dim)] text-accent border border-accent/20'
  }
})
</script>

<style scoped>
.text-accent {
  color: var(--accent);
}
.border-accent {
  border-color: var(--accent);
}

.system-card:hover {
  background: var(--bg-card-hover) !important;
}
</style>
