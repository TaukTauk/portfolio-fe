<template>
  <section
    id="contact"
    class="relative z-10 py-32 px-6 md:px-12 border-t"
    :class="isDark ? 'border-white/5' : 'border-black/5'"
  >
    <div class="max-w-[1100px] mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <!-- Left -->
        <div>
          <div class="section-label mb-3">// Contact</div>
          <h2 class="section-title mb-6">Let's work<br />together</h2>
          <p class="font-mono text-[13px] leading-relaxed mb-10" style="color: var(--text-muted)">
            Open to full-stack and backend opportunities in ASEAN. 
			Particularly interested in roles involving scalable system architecture, 
			backend engineering, AI-integrated systems, or end-to-end product development.
          </p>

          <!-- Status indicator -->
          <div
            class="inline-flex items-center gap-3 border px-4 py-3 font-mono text-[13px] tracking-wide"
            :class="isDark ? 'border-white/8' : 'border-black/8'"
            style="color: var(--text-secondary)"
          >
            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
            Currently available
          </div>
        </div>

        <!-- Right: contact links -->
        <div class="flex flex-col gap-3">
          <a
            v-for="link in contactLinks"
            :key="link.label"
            :href="link.href"
            target="_blank"
            class="contact-link group flex items-center justify-between border px-6 py-5 no-underline transition-all duration-300"
            :class="isDark ? 'border-white/8' : 'border-black/8'"
            @mouseenter="hoveredLink = link.label"
            @mouseleave="hoveredLink = null"
          >
            <div class="flex items-center gap-4">
              <div
                class="flex items-center justify-center w-9 h-9 border transition-all duration-300"
                :class="[
                  hoveredLink === link.label
                    ? 'border-accent bg-[var(--accent-dim)] text-accent'
                    : isDark
                      ? 'border-white/10 text-[var(--text-muted)]'
                      : 'border-black/10 text-[var(--text-muted)]',
                ]"
              >
                <v-icon :icon="link.icon" size="16" />
              </div>
              <div>
                <div
                  class="font-mono text-[14px] font-bold tracking-wide transition-colors duration-300"
                  :class="hoveredLink === link.label ? 'text-accent' : 'text-[var(--text-primary)]'"
                >
                  {{ link.label }}
                </div>
                <div class="font-mono text-[12px] mt-0.5" style="color: var(--text-muted)">
                  {{ link.sub }}
                </div>
              </div>
            </div>

            <v-icon
              icon="mdi-arrow-top-right"
              size="16"
              class="transition-all duration-300"
              :class="hoveredLink === link.label ? 'text-accent' : 'text-[var(--text-muted)]'"
            />
          </a>
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
const hoveredLink = ref<string | null>(null)

const contactLinks = [
  {
    label: 'GitHub',
    sub: 'github.com/TaukTauk',
    href: 'https://github.com/TaukTauk',
    icon: 'mdi-github',
  },
  {
    label: 'LinkedIn',
    sub: 'linkedin.com/in/tauk-tauk-lin-60a157222',
    href: 'https://linkedin.com/in/tauk-tauk-lin-60a157222',
    icon: 'mdi-linkedin',
  },
  {
    label: 'Email',
    sub: 'tauktauk51833@gmail.com',
    href: 'mailto:tauktauk51833@gmail.com',
    icon: 'mdi-email-outline',
  },
]
</script>

<style scoped>
.text-accent {
  color: var(--accent);
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

.contact-link:hover {
  border-color: var(--border-hover);
  background: var(--bg-card);
  transform: translateX(4px);
}
</style>
