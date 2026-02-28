<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 h-[60px] border-b transition-all duration-300"
    :class="[
      scrolled ? 'backdrop-blur-md shadow-lg' : '',
      isDark ? 'bg-[#1e1e1e]/90 border-white/5' : 'bg-[#f5f4f0]/90 border-black/5',
    ]"
  >
    <!-- Logo -->
    <RouterLink
      to="/"
      class="font-mono text-[13px] font-medium tracking-widest text-accent no-underline"
    >
      TAUK<span class="text-[var(--text-muted)]">.dev</span>
    </RouterLink>

    <!-- Desktop links -->
    <div class="hidden md:flex items-center gap-8">
      <a
        v-for="link in navLinks"
        :key="link.label"
        :href="link.href"
        class="nav-link font-mono text-[13px] tracking-widest uppercase transition-colors duration-200 no-underline"
        :class="
          isDark
            ? 'text-[var(--text-secondary)] hover:text-accent'
            : 'text-[var(--text-secondary)] hover:text-accent'
        "
        @click="handleNavClick"
      >
        {{ link.label }}
      </a>
    </div>

    <!-- Right actions -->
    <div class="flex items-center gap-3">
      <!-- Theme toggle -->
      <button
        class="flex items-center justify-center w-8 h-8 border rounded-sm transition-all duration-200 hover:border-accent hover:text-accent"
        :class="
          isDark
            ? 'border-white/10 text-[var(--text-muted)]'
            : 'border-black/10 text-[var(--text-muted)]'
        "
        @click="themeStore.toggle()"
        :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      >
        <v-icon :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'" size="16" />
      </button>

      <!-- Mobile menu -->
      <button
        class="flex md:hidden items-center justify-center w-8 h-8 border rounded-sm transition-all duration-200 hover:border-accent hover:text-accent"
        :class="
          isDark
            ? 'border-white/10 text-[var(--text-muted)]'
            : 'border-black/10 text-[var(--text-muted)]'
        "
        @click="mobileOpen = !mobileOpen"
      >
        <v-icon :icon="mobileOpen ? 'mdi-close' : 'mdi-menu'" size="16" />
      </button>
    </div>

    <!-- Mobile dropdown -->
    <Transition name="mobile-menu">
      <div
        v-if="mobileOpen"
        class="absolute top-[60px] left-0 right-0 border-b flex flex-col py-4"
        :class="isDark ? 'bg-[#1e1e1e] border-white/5' : 'bg-[#f5f4f0] border-black/5'"
      >
        <a
          v-for="link in navLinks"
          :key="link.label"
          :href="link.href"
          class="font-mono text-[13px] tracking-widest uppercase px-12 py-3 transition-colors duration-200 no-underline"
          :class="
            isDark
              ? 'text-[var(--text-secondary)] hover:text-accent'
              : 'text-[var(--text-secondary)] hover:text-accent'
          "
          @click="mobileOpen = false"
        >
          {{ link.label }}
        </a>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)
const scrolled = ref(false)
const mobileOpen = ref(false)

const navLinks = [
  { label: 'Approach', href: '/#approach' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Systems', href: '/#systems' },
  { label: 'Stack', href: '/#stack' },
  { label: 'Contact', href: '/#contact' },
]

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}
const handleNavClick = () => {
  mobileOpen.value = false
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.text-accent {
  color: var(--accent);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
