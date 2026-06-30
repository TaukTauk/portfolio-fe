<template>
  <section id="experience" class="relative z-10 py-32 px-6 md:px-12">
    <div class="max-w-[1100px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">

      <!-- Header -->
      <div class="mb-16">
        <div class="section-label mb-3">// Experience</div>
        <h2 class="section-title">Work history</h2>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Vertical line -->
        <div
          class="absolute left-[11px] top-2 bottom-2 w-px"
          style="background: var(--border);"
        />

        <div class="space-y-10">
          <div
            v-for="exp in experiences"
            :key="exp.company"
            class="relative pl-10"
          >
            <!-- Timeline dot -->
            <div
              class="absolute left-0 top-2 w-[23px] h-[23px] border-2 flex items-center justify-center"
              :style="exp.end === null
                ? 'border-color: var(--accent); background: var(--bg-card);'
                : 'border-color: var(--border); background: var(--bg-card);'"
            >
              <span
                v-if="exp.end === null && exp.isPrimary"
                class="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block"
              />
              <span
                v-else-if="exp.end === null"
                class="w-1.5 h-1.5 rounded-full inline-block"
                style="background: var(--accent);"
              />
              <span
                v-else
                class="w-1.5 h-1.5 rounded-full inline-block"
                style="background: var(--text-muted);"
              />
            </div>

            <!-- Card -->
            <div
              class="border transition-all duration-300 hover:border-accent/20"
              :class="isDark ? 'bg-[var(--bg-card)] border-white/5' : 'bg-white border-black/5'"
            >
              <!-- Top bar -->
              <div
                class="flex flex-wrap items-center justify-between gap-4 px-8 py-5 border-b"
                :class="isDark ? 'border-white/5' : 'border-black/5'"
              >
                <div class="flex items-center gap-3 flex-wrap">
                  <!-- Primary current -->
                  <div
                    v-if="exp.isPrimary && exp.end === null"
                    class="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase px-2 py-1"
                    style="background: var(--accent-dim); color: var(--accent); border: 1px solid rgba(224,49,49,0.2);"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                    Primary · Current
                  </div>
                  <!-- Concurrent current -->
                  <div
                    v-else-if="!exp.isPrimary && exp.end === null"
                    class="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase px-2 py-1"
                    style="background: var(--accent-dim); color: var(--accent); border: 1px solid rgba(224,49,49,0.2);"
                  >
                    Current
                  </div>
                  <!-- Past -->
                  <div
                    v-else
                    class="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase px-2 py-1 border"
                    :class="isDark ? 'border-white/10 text-[var(--text-muted)]' : 'border-black/10 text-[var(--text-muted)]'"
                  >
                    Ended {{ formatEnd(exp.end) }}
                  </div>

                  <span
                    class="font-mono text-[11px] tracking-widest uppercase"
                    style="color: var(--text-muted);"
                  >
                    {{ exp.type }} · {{ exp.location }}
                  </span>
                </div>

                <div
                  class="flex items-center gap-2 font-mono text-[11px]"
                  style="color: var(--text-muted);"
                >
                  <v-icon icon="mdi-calendar-outline" size="13" />
                  {{ formatPeriod(exp.start, exp.end) }} · {{ duration(exp.start, exp.end) }}
                </div>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-3 gap-0">

                <!-- Left column -->
                <div
                  class="p-8 border-b lg:border-b-0 lg:border-r"
                  :class="isDark ? 'border-white/5' : 'border-black/5'"
                >
                  <!-- Company -->
                  <component
                    :is="exp.companyUrl ? 'a' : 'div'"
                    v-bind="exp.companyUrl ? { href: exp.companyUrl, target: '_blank', rel: 'noopener noreferrer' } : {}"
                    class="block no-underline mb-1 transition-colors duration-200 group"
                    :class="exp.companyUrl ? 'hover:text-accent' : ''"
                    style="color: var(--text-primary);"
                  >
                    <span
                      class="font-bold"
                      style="font-family: var(--display); font-size: 26px;"
                    >
                      {{ exp.company }}
                    </span>
                    <v-icon
                      v-if="exp.companyUrl"
                      icon="mdi-open-in-new"
                      size="14"
                      class="ml-1 opacity-0 group-hover:opacity-50 transition-opacity duration-200"
                    />
                  </component>

                  <!-- Role -->
                  <div
                    class="font-mono text-[13px] tracking-wide mb-6"
                    style="color: var(--accent);"
                  >
                    {{ exp.role }}
                  </div>

                  <!-- Description -->
                  <p
                    class="text-[13px] leading-relaxed mb-6"
                    style="color: var(--text-secondary);"
                  >
                    {{ exp.description }}
                  </p>

                  <!-- Meta tags -->
                  <div class="flex flex-wrap gap-2">
                    <div
                      v-for="tag in [exp.type, exp.location]"
                      :key="tag"
                      class="flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1.5 border"
                      :class="isDark ? 'border-white/10 text-[var(--text-muted)]' : 'border-black/10 text-[var(--text-muted)]'"
                    >
                      {{ tag }}
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
                        v-for="resp in exp.responsibilities"
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
                        v-for="group in exp.stackGroups"
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

interface Responsibility { icon: string; label: string }
interface StackGroup { label: string; items: string[] }
interface Experience {
  company: string
  companyUrl: string | null
  role: string
  type: string
  location: string
  start: Date
  end: Date | null
  isPrimary: boolean
  description: string
  responsibilities: Responsibility[]
  stackGroups: StackGroup[]
}

const experiences: Experience[] = [
  {
    company: 'ThitsaWorks',
    companyUrl: 'https://thitsaworks.com',
    role: 'Security Engineer',
    type: 'Full-time · Contract',
    location: 'Remote',
    start: new Date(2026, 5, 24),
    end: null,
    isPrimary: true,
    description: 'Supporting security engineering for a Mojaloop-based payments and Mifos X core banking platform (ISO 27001:2022 certified).',
    responsibilities: [
      { icon: 'mdi-shield-lock-outline',   label: 'Kubernetes & cloud-native platform security' },
      { icon: 'mdi-key-variant',           label: 'HashiCorp Vault & secrets lifecycle management' },
      { icon: 'mdi-certificate-outline',   label: 'PKI, certificate rotation & mTLS' },
      { icon: 'mdi-bug-outline',           label: 'Vulnerability management & CVE triage' },
      { icon: 'mdi-pipe',                  label: 'CI/CD & GitOps security integration' },
      { icon: 'mdi-file-document-outline', label: 'ISMS compliance & security monitoring' },
    ],
    stackGroups: [
      { label: 'Security',   items: ['Kubernetes', 'HashiCorp Vault', 'Istio', 'PKI/mTLS', 'TLS/SSL'] },
      { label: 'DevSecOps',  items: ['Argo CD', 'GitOps', 'CI/CD', 'Container Scanning', 'SAST/DAST'] },
      { label: 'Compliance', items: ['ISO 27001', 'NIST CSF 2.0', 'CIS Controls v8', 'OWASP SAMM'] },
    ],
  },
  {
    company: 'Sozo Lab',
    companyUrl: null,
    role: 'Product Associate — AI & Agentic Workflows',
    type: 'Part-time · Contract',
    location: 'Remote',
    start: new Date(2026, 5, 3),
    end: null,
    isPrimary: false,
    description: 'Designing and testing AI-assisted and agentic workflows for a responsible AI portfolio focused on social impact and organizational resilience.',
    responsibilities: [
      { icon: 'mdi-graph-outline',          label: 'Agentic workflow design & testing' },
      { icon: 'mdi-map-outline',            label: 'Workflow discovery & process mapping' },
      { icon: 'mdi-text-box-outline',       label: 'Prompt libraries & AI assistant instructions' },
      { icon: 'mdi-cog-outline',            label: 'No-code/low-code automation configuration' },
      { icon: 'mdi-account-group-outline',  label: 'Internal & external AI enablement' },
    ],
    stackGroups: [
      { label: 'AI Tools', items: ['LangChain', 'LangGraph', 'Flowise', 'MCP', 'RAG'] },
      { label: 'Workflow',  items: ['Prompt Engineering', 'Agentic Systems', 'Automation'] },
    ],
  },
  {
    company: 'DatTech',
    companyUrl: 'https://www.dattech.dev/',
    role: 'Full-Stack Developer',
    type: 'Full-time',
    location: 'Remote',
    start: new Date(2024, 11),
    end: new Date(2026, 4),
    isPrimary: false,
    description: 'A small, agile software company focused on building scalable, future-proof solutions. Worked directly with clients across full-stack web and AI-integrated systems.',
    responsibilities: [
      { icon: 'mdi-code-braces',            label: 'Full-stack web development' },
      { icon: 'mdi-cloud-upload-outline',   label: 'Deployment & DevOps' },
      { icon: 'mdi-monitor-eye',            label: 'Production monitoring & maintenance' },
      { icon: 'mdi-account-tie-outline',    label: 'Client communication & requirements' },
      { icon: 'mdi-sitemap-outline',        label: 'System design & architecture' },
      { icon: 'mdi-database-edit-outline',  label: 'Database design & management' },
    ],
    stackGroups: [
      { label: 'Backend',  items: ['FastAPI', 'Python', 'Node.js', 'Express'] },
      { label: 'Frontend', items: ['Vue 3', 'Vuetify 3', 'Tailwind CSS', 'Pinia'] },
      { label: 'Database', items: ['PostgreSQL', 'MySQL', 'pgvector', 'SQLAlchemy'] },
      { label: 'AI / RAG', items: ['LangChain', 'LangGraph', 'Ollama'] },
      { label: 'Infra',    items: ['Docker', 'Nginx', 'PM2', 'DigitalOcean'] },
    ],
  },
]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatPeriod(start: Date, end: Date | null): string {
  const s = `${MONTHS[start.getMonth()]} ${start.getFullYear()}`
  const e = end ? `${MONTHS[end.getMonth()]} ${end.getFullYear()}` : 'Present'
  return `${s} — ${e}`
}

function formatEnd(end: Date | null): string {
  if (!end) return ''
  return `${MONTHS[end.getMonth()]} ${end.getFullYear()}`
}

function duration(start: Date, end: Date | null): string {
  const to = end ?? new Date()
  const months =
    (to.getFullYear() - start.getFullYear()) * 12 + (to.getMonth() - start.getMonth())
  const y = Math.floor(months / 12)
  const m = months % 12
  if (y === 0) return `${m}mo`
  if (m === 0) return `${y}yr`
  return `${y}yr ${m}mo`
}
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
.hover\:text-accent:hover  { color: var(--accent); }
.hover\:border-accent:hover { border-color: var(--accent); }
.border-accent\/20 { border-color: rgba(224, 49, 49, 0.2); }
</style>
