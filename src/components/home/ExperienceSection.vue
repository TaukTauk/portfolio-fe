<template>
  <section id="experience" class="relative z-10 py-32 px-6 md:px-12">
    <div class="max-w-[1100px] mx-auto">

      <!-- Header -->
      <div class="mb-16">
        <div class="section-label mb-3">// Experience</div>
        <h2 class="section-title">Work history</h2>
      </div>

      <!-- Main card -->
      <div
        class="border transition-all duration-300 hover:border-accent/20"
        :class="isDark ? 'bg-[var(--bg-card)] border-white/5' : 'bg-white border-black/5'"
      >
        <!-- Top bar -->
        <div
          class="flex flex-wrap items-center justify-between gap-4 px-8 py-5 border-b"
          :class="isDark ? 'border-white/5' : 'border-black/5'"
        >
          <div class="flex items-center gap-4">
            <!-- Current badge -->
            <div
              class="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase px-2 py-1"
              style="background: var(--accent-dim); color: var(--accent); border: 1px solid rgba(224,49,49,0.2);"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
              Current
            </div>
            <span
              class="font-mono text-[11px] tracking-widest uppercase"
              style="color: var(--text-muted);"
            >
              Full-time · Remote
            </span>
          </div>
          <div
            class="flex items-center gap-2 font-mono text-[11px]"
            style="color: var(--text-muted);"
          >
            <v-icon icon="mdi-calendar-outline" size="13" />
            Dec 2024 — Present · {{ duration }}
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-0">

          <!-- Left column -->
          <div
            class="p-8 border-b lg:border-b-0 lg:border-r"
            :class="isDark ? 'border-white/5' : 'border-black/5'"
          >
            <!-- Company -->
            <a
              href="https://www.dattech.dev/"
              target="_blank"
              class="block no-underline mb-1 transition-colors duration-200 hover:text-accent group"
              style="color: var(--text-primary);"
            >
              <span
                class="font-bold"
                style="font-family: var(--display); font-size: 26px;"
              >
                DatTech
              </span>
              <v-icon
                icon="mdi-open-in-new"
                size="14"
                class="ml-1 opacity-0 group-hover:opacity-50 transition-opacity duration-200"
              />
            </a>

            <!-- Role -->
            <div
              class="font-mono text-[13px] tracking-wide mb-6"
              style="color: var(--accent);"
            >
              Full-Stack Developer
            </div>

            <!-- Company description -->
            <p
              class="text-[13px] leading-relaxed mb-6"
              style="color: var(--text-secondary);"
            >
              A small, agile software company focused on building scalable, future-proof solutions. Works directly with clients — no bureaucracy, full transparency from day one.
            </p>

            <!-- Meta tags -->
            <div class="flex flex-wrap gap-2">
              <div
                class="flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1.5 border"
                :class="isDark ? 'border-white/10 text-[var(--text-muted)]' : 'border-black/10 text-[var(--text-muted)]'"
              >
                <v-icon icon="mdi-briefcase-outline" size="12" />
                Full-time
              </div>
              <div
                class="flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1.5 border"
                :class="isDark ? 'border-white/10 text-[var(--text-muted)]' : 'border-black/10 text-[var(--text-muted)]'"
              >
                <v-icon icon="mdi-remote-desktop" size="12" />
                Remote
              </div>
              <div
                class="flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1.5 border"
                :class="isDark ? 'border-white/10 text-[var(--text-muted)]' : 'border-black/10 text-[var(--text-muted)]'"
              >
                <v-icon icon="mdi-map-marker-outline" size="12" />
                ASEAN
              </div>
            </div>
          </div>

          <!-- Right column -->
          <div class="lg:col-span-2 p-8">

            <!-- Responsibilities -->
            <div class="mb-10">
              <div
                class="font-mono text-[11px] tracking-widest uppercase mb-5"
                style="color: var(--text-muted);"
              >
                Responsibilities
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  v-for="resp in responsibilities"
                  :key="resp.label"
                  class="flex items-start gap-3 group"
                >
                  <div
                    class="flex-shrink-0 flex items-center justify-center w-7 h-7 border mt-0.5 transition-all duration-200 group-hover:border-accent"
                    :class="isDark ? 'border-white/10' : 'border-black/10'"
                  >
                    <v-icon
                      :icon="resp.icon"
                      size="13"
                      style="color: var(--accent); opacity: 0.7;"
                    />
                  </div>
                  <span
                    class="text-[13px] leading-relaxed"
                    style="color: var(--text-secondary);"
                  >
                    {{ resp.label }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Stack -->
            <div>
              <div
                class="font-mono text-[11px] tracking-widest uppercase mb-4"
                style="color: var(--text-muted);"
              >
                Tech Stack
              </div>

              <div class="space-y-3">
                <div
                  v-for="group in stackGroups"
                  :key="group.label"
                  class="flex items-start gap-3"
                >
                  <div
                    class="font-mono text-[10px] tracking-widest uppercase pt-1 flex-shrink-0 w-24"
                    style="color: var(--text-muted);"
                  >
                    {{ group.label }}
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tech in group.items"
                      :key="tech"
                      class="font-mono text-[11px] px-2 py-1 border transition-colors duration-200 hover:border-accent hover:text-accent cursor-default"
                      :class="isDark ? 'border-white/10 text-[var(--text-muted)]' : 'border-black/10 text-[var(--text-muted)]'"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)

const duration = computed(() => {
  const start = new Date(2024, 11)
  const now = new Date()
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth())
  const y = Math.floor(months / 12)
  const m = months % 12
  if (y === 0) return `${m}mo`
  if (m === 0) return `${y}yr`
  return `${y}yr ${m}mo`
})

const responsibilities = [
  { icon: 'mdi-code-braces',         label: 'Full-stack web development' },
  { icon: 'mdi-cloud-upload-outline', label: 'Deployment & DevOps' },
  { icon: 'mdi-monitor-eye',          label: 'Production monitoring & maintenance' },
  { icon: 'mdi-account-tie-outline',  label: 'Client communication & requirements gathering' },
  { icon: 'mdi-sitemap-outline',      label: 'System design & architecture' },
  { icon: 'mdi-database-edit-outline',label: 'Database design & management' },
]

const stackGroups = [
  {
    label: 'Backend',
    items: ['FastAPI', 'Python', 'Node.js', 'Express'],
  },
  {
    label: 'Frontend',
    items: ['Vue 3', 'Vuetify 3', 'Tailwind CSS', 'Pinia', 'Axios', 'EJS', 'Chart.js'],
  },
  {
    label: 'Database',
    items: ['PostgreSQL', 'MySQL', 'pgvector', 'SQLAlchemy', 'Alembic'],
  },
  {
    label: 'AI / RAG',
    items: ['LangChain', 'LangGraph', 'Ollama', 'Gemma'],
  },
  {
    label: 'Infra',
    items: ['Docker', 'Nginx', 'PM2', 'DigitalOcean', 'Linux'],
  },
  {
    label: 'Auth',
    items: ['JWT', 'bcrypt', 'Helmet', 'express-rate-limit'],
  },
]
</script>

<style scoped>
.section-label {
  font-family: var(--mono);
  font-size: 13px;
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
.text-accent  { color: var(--accent); }
.border-accent { border-color: var(--accent); }
</style>