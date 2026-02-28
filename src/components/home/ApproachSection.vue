<template>
  <section id="approach" class="relative z-10 py-32 px-6 md:px-12">
    <div class="max-w-[1100px] mx-auto">
      <!-- Section header -->
      <div class="mb-16">
        <div class="section-label mb-3">// Engineering Approach</div>
        <h2 class="section-title">How I think about systems</h2>
      </div>

      <!-- Principles grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-px"
        :class="isDark ? 'bg-white/5' : 'bg-black/5'"
      >
        <div
          v-for="(p, i) in principles"
          :key="p.title"
          class="principle-card group relative overflow-hidden p-8 cursor-default transition-all duration-300"
          :class="isDark ? 'bg-[var(--bg-card)]' : 'bg-white'"
          @mouseenter="active = i"
          @mouseleave="active = null"
        >
          <!-- Number -->
          <div
            class="absolute top-6 right-8 font-mono text-[13px] tracking-widest transition-colors duration-300"
            :class="active === i ? 'text-accent' : 'text-[var(--text-muted)]'"
          >
            {{ String(i + 1).padStart(2, '0') }}
          </div>

          <!-- Left accent bar -->
          <div
            class="absolute left-0 top-0 bottom-0 w-[2px] bg-accent transition-transform duration-300 origin-bottom"
            :class="active === i ? 'scale-y-100' : 'scale-y-0'"
          ></div>

          <!-- Icon -->
          <div
            class="flex items-center justify-center w-9 h-9 border mb-5 transition-all duration-300"
            :class="[
              active === i
                ? 'border-accent bg-[var(--accent-dim)] text-accent'
                : isDark
                  ? 'border-white/10 text-[var(--text-muted)]'
                  : 'border-black/10 text-[var(--text-muted)]',
            ]"
          >
            <v-icon :icon="p.icon" size="16" />
          </div>

          <!-- Content -->
          <div
            class="font-mono text-[14px] font-bold tracking-wide mb-3 transition-colors duration-300"
            :class="active === i ? 'text-accent' : 'text-[var(--text-primary)]'"
          >
            {{ p.title }}
          </div>
          <div class="text-[14px] leading-relaxed" style="color: var(--text-secondary)">
            {{ p.desc }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)
const active = ref<number | null>(null)

const principles = [
  {
    icon: 'mdi-shield-lock-outline',
    title: 'Security-first mindset',
    desc: 'Building systems with security considerations at every layer, from authentication to data handling and API boundary enforcement.',
  },
  {
    icon: 'mdi-layers-outline',
    title: 'Separation of concerns',
    desc: 'Clean architecture patterns that ensure maintainability and testability — controllers, services, and data layers stay clearly separated.',
  },
  {
    icon: 'mdi-speedometer',
    title: 'Performance-aware backend design',
    desc: 'Optimizing database queries, caching strategies, and API response times with production scale in mind from the start.',
  },
  {
    icon: 'mdi-server-outline',
    title: 'Infrastructure-conscious development',
    desc: 'Understanding deployment pipelines, containerization, and cloud infrastructure as a developer — not just as an operator.',
  },
  {
    icon: 'mdi-arrow-expand-all',
    title: 'Scalable architecture thinking',
    desc: 'Designing systems that can grow with business needs while maintaining reliability, observability, and performance.',
  },
  {
    icon: 'mdi-cpu-64-bit',
    title: 'Systems-level depth',
    desc: 'Low-level understanding of OS concepts, networking, and memory management that informs better abstractions at every layer.',
  },
]
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
