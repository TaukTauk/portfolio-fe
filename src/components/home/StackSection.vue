<template>
  <section id="stack" class="relative z-10 py-32 px-6 md:px-12">
    <div class="max-w-[1100px] mx-auto">

      <!-- Header -->
      <div class="mb-16">
        <div class="section-label mb-3">// Tech Stack</div>
        <h2 class="section-title">Tools &amp; technologies</h2>
      </div>

      <!-- Grid -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px"
        :class="isDark ? 'bg-white/5' : 'bg-black/5'"
      >
        <StackCard
          v-for="cat in stackCategories"
          :key="cat.name"
          :category="cat"
        />
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'
import StackCard from '@/components/ui/StackCard.vue'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)

const stackCategories = [
  {
    name: 'Backend',
    icon: 'mdi-server-outline',
    tags: ['FastAPI', 'Node.js', 'Express'],
  },
  {
    name: 'Languages',
    icon: 'mdi-code-braces',
    tags: ['Python', 'JavaScript', 'TypeScript', 'C', 'C++'],
  },
  {
    name: 'Databases',
    icon: 'mdi-database-outline',
    tags: ['PostgreSQL', 'MySQL', 'MongoDB'],
  },
  {
    name: 'Frontend',
    icon: 'mdi-monitor-dashboard',
    tags: ['Vue.js', 'Vuetify', 'Bootstrap', 'React', 'Tailwind', 'HTML/CSS'],
  },
  {
    name: 'Infrastructure',
    icon: 'mdi-cloud-outline',
    tags: ['Docker', 'Nginx', 'PM2', 'Linux'],
  },
  {
    name: 'Auth & Security',
    icon: 'mdi-shield-lock-outline',
    tags: ['JWT', 'RBAC', 'OAuth 2.0', 'TLS/SSL'],
  },
  {
    name: 'AI Integration',
    icon: 'mdi-brain',
    tags: ['Gemini API', 'pgvector', 'RAG', 'FastAPI', 'Ollama'],
  },
  {
    name: 'Systems',
    icon: 'mdi-cpu-64-bit',
    tags: ['POSIX', 'Sockets', 'epoll', 'Processes'],
  },
]
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