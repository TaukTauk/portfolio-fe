<template>
  <section id="about" class="relative z-10 py-24 px-6 md:px-12">
    <div class="max-w-[1100px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto">

      <!-- Header -->
      <div class="mb-12">
        <div class="section-label mb-3">// About</div>
        <h2 class="section-title">Who I am</h2>
      </div>

      <!-- Card -->
      <div
        class="border transition-all duration-300"
        :class="isDark ? 'bg-[var(--bg-card)] border-white/5' : 'bg-white border-black/5'"
      >
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-0">

          <!-- Left column — values -->
          <div
            class="p-8 border-b lg:border-b-0 lg:border-r"
            :class="isDark ? 'border-white/5' : 'border-black/5'"
          >
            <div
              class="font-mono text-[11px] tracking-widest uppercase mb-6"
              style="color: var(--text-muted);"
            >
              What I care about
            </div>
            <div class="space-y-3">
              <div
                v-for="val in values"
                :key="val.label"
                class="flex items-center gap-3 group"
              >
                <div
                  class="flex-shrink-0 flex items-center justify-center w-7 h-7 border transition-all duration-200 group-hover:border-accent"
                  :class="isDark ? 'border-white/10' : 'border-black/10'"
                >
                  <v-icon :icon="val.icon" size="13" style="color: var(--accent); opacity: 0.7;" />
                </div>
                <span class="font-mono text-[13px]" style="color: var(--text-secondary);">
                  {{ val.label }}
                </span>
              </div>
            </div>
          </div>

          <!-- Right column — bio -->
          <div class="lg:col-span-2 p-8 space-y-6">
            <p class="font-mono text-[14px] leading-relaxed" style="color: var(--text-secondary);">
              Security Engineer with a full-stack development background and hands-on experience
              securing infrastructure, platform, and application layers for production systems.
              I currently support security engineering for a FinTech payments and core banking
              platform — implementing Kubernetes security controls, HashiCorp Vault secrets
              management, PKI/certificate lifecycle, and mTLS, while integrating security into
              CI/CD and GitOps workflows.
            </p>
            <p class="font-mono text-[14px] leading-relaxed" style="color: var(--text-secondary);">
              My foundation from 42 Bangkok strengthened my low-level programming skills in C/C++
              and my understanding of systems design, memory management, and how things work under
              the hood — a foundation that carries into both development and infrastructure security
              work. Alongside this, I continue building full-stack systems and support AI product
              work: mapping workflows into agentic systems, prompt libraries, and automation tooling.
            </p>
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

const values = [
  { icon: 'mdi-shield-lock-outline',  label: 'Secure-by-design systems' },
  { icon: 'mdi-layers-outline',       label: 'Clean architecture' },
  { icon: 'mdi-wrench-outline',       label: 'Practical problem solving' },
  { icon: 'mdi-trending-up',          label: 'Continuous improvement' },
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
.border-accent { border-color: var(--accent); }
</style>
