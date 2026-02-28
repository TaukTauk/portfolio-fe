<template>
  <div
    class="project-card group relative overflow-hidden cursor-pointer transition-all duration-300"
    :class="isDark ? 'bg-[var(--bg-card)]' : 'bg-white'"
    @click="$router.push(project.route)"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <!-- Top accent line -->
    <div
      class="absolute top-0 left-0 right-0 h-[2px] bg-accent transition-transform duration-500 origin-left"
      :class="hovered ? 'scale-x-100' : 'scale-x-0'"
    />

    <div class="p-8">
      <!-- Status + category row -->
      <div class="flex items-center justify-between mb-5">
        <span
          :class="[
            'status-badge font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-1',
            statusClass,
          ]"
        >
          {{ project.statusLabel }}
        </span>
        <span
          class="font-mono text-[12px] tracking-widest transition-colors duration-300"
          :class="hovered ? 'text-accent' : 'text-[var(--text-muted)]'"
        >
          {{ String(index + 1).padStart(2, '0') }}
        </span>
      </div>

      <!-- Name -->
      <h3
        class="font-display font-bold mb-3 transition-colors duration-300"
        style="font-family: var(--display); font-size: 22px"
        :class="hovered ? 'text-accent' : 'text-[var(--text-primary)]'"
      >
        {{ project.name }}
      </h3>

      <!-- Tagline -->
      <div
        class="font-mono text-[13px] mb-3 tracking-wide"
        style="color: var(--accent); opacity: 0.7"
      >
        {{ project.tagline }}
      </div>

      <!-- Description -->
      <p class="text-[14px] leading-relaxed mb-6" style="color: var(--text-secondary)">
        {{ project.desc }}
      </p>

      <!-- Arch tags -->
      <div class="flex flex-wrap gap-2 mb-5">
        <div
          v-for="tag in project.archTags"
          :key="tag.label"
          class="arch-tag flex items-center gap-1 font-mono text-[12px] px-2 py-1 border transition-all duration-200"
          :class="
            isDark
              ? 'border-white/8 text-[var(--text-muted)]'
              : 'border-black/8 text-[var(--text-muted)]'
          "
        >
          <v-icon :icon="tag.icon" size="11" />
          {{ tag.label }}
        </div>
      </div>

      <!-- Tech tags -->
      <div class="flex flex-wrap gap-2 mb-8">
        <span
          v-for="tech in project.techTags"
          :key="tech"
          class="font-mono text-[12px] px-2 py-1 rounded-sm"
          style="background: var(--tag-bg); color: var(--tag-text)"
        >
          {{ tech }}
        </span>
      </div>

      <!-- CTA -->
		<div class="flex items-center justify-between">
		  <div
		    class="flex items-center gap-2 font-mono text-[13px] tracking-wide transition-all duration-300 cursor-pointer"
		    :class="hovered ? 'text-accent gap-3' : 'text-[var(--text-muted)]'"
		    @click.stop="$router.push(project.route)"
		  >
		    <v-icon icon="mdi-arrow-right" size="14" />
		    View Case Study
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
  index: number
}>()

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)
const hovered = ref(false)

const statusClass = computed(() => {
  switch (props.project.status) {
    case 'production':
      return 'bg-green-500/10 text-green-400 border border-green-500/20'
    case 'development':
      return 'bg-[var(--accent-dim)] text-accent border border-accent/20'
    case 'system':
      return 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
    case 'infrastructure':
      return 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
    default:
      return ''
  }
})
</script>

<style scoped>
.text-accent {
  color: var(--accent);
}
.bg-accent {
  background: var(--accent);
}
.border-accent {
  border-color: var(--accent);
}
.bg-\[var\(--accent-dim\)\] {
  background: var(--accent-dim);
}

.project-card:hover {
  background: var(--bg-card-hover) !important;
}
</style>
