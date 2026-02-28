<template>
  <div class="min-h-screen" :class="isDark ? 'theme-dark' : 'theme-light'">
    <AppNav />

    <main class="relative z-10 pt-[60px]">
      <!-- Hero banner -->
      <div
        class="relative overflow-hidden px-6 md:px-12 py-24 border-b"
        :class="isDark ? 'border-white/5' : 'border-black/5'"
      >
        <!-- Background photo if available -->
        <!-- <div
          v-if="project.photos[0]"
          class="absolute inset-0 bg-cover bg-center"
          :style="{ backgroundImage: `url(${project.photos[0]})` }"
        >
          <div class="absolute inset-0" :class="isDark ? 'bg-[#1e1e1e]/85' : 'bg-white/85'" />
        </div> -->

        <div class="relative z-10 max-w-[1100px] mx-auto">
          <!-- Back button -->
          <button
            class="flex items-center gap-2 font-mono text-[13px] tracking-widest uppercase mb-10 transition-all duration-200 hover:text-accent group"
            style="color: var(--text-muted)"
            @click="$router.back()"
          >
            <v-icon
              icon="mdi-arrow-left"
              size="14"
              class="transition-transform duration-200 group-hover:-translate-x-1"
            />
            Back
          </button>

          <!-- Status + category -->
          <div class="flex flex-wrap items-center gap-3 mb-6">
            <span
              :class="[
                'status-badge font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-1',
                statusClass,
              ]"
            >
              {{ project.statusLabel }}
            </span>
            <span
              v-if="project.lang"
              class="font-mono text-[13px] tracking-[0.1em] px-2 py-1 border"
              :class="
                isDark
                  ? 'border-white/10 text-[var(--text-muted)]'
                  : 'border-black/10 text-[var(--text-muted)]'
              "
            >
              {{ project.lang }}
            </span>
            <span class="font-mono text-[13px] tracking-[0.1em]" style="color: var(--text-muted)">
              {{ project.category === 'professional' ? 'Professional Project' : 'Systems Project' }}
            </span>
          </div>

          <!-- Title -->
			<component
			  :is="project.link ? 'a' : 'h1'"
			  :href="project.link || undefined"
			  :target="project.link ? '_blank' : undefined"
			  class="font-extrabold leading-none tracking-tight mb-4 block transition-all duration-200"
			  :class="[
			    project.link ? 'cursor-pointer hover:text-accent group-title' : '',
			  ]"
			  style="font-family: var(--display); font-size: clamp(40px, 7vw, 80px); color: var(--text-primary); text-decoration: none;"
			>
			  {{ project.name }}
			  <v-icon
			    v-if="project.link"
			    icon="mdi-open-in-new"
			    size="24"
			    class="ml-2 opacity-0 transition-opacity duration-200 align-middle"
			    style="color: var(--accent);"
			    :class="{ 'opacity-100': project.link }"
			  />
			</component>

          <!-- Tagline -->
          <div
            class="font-mono mb-6"
            style="font-size: clamp(12px, 1.4vw, 15px); color: var(--accent)"
          >
            {{ project.tagline }}
          </div>

          <!-- Description -->
          <p
            class="font-mono text-[14px] leading-relaxed max-w-[620px]"
            style="color: var(--text-secondary)"
          >
            {{ project.desc }}
          </p>

          <!-- Tech tags row -->
          <div class="flex flex-wrap gap-2 mt-8">
            <span
              v-for="tech in project.stack"
              :key="tech"
              class="font-mono text-[13px] px-3 py-1.5 border transition-colors duration-200 hover:border-accent hover:text-accent cursor-default"
              :class="
                isDark
                  ? 'border-white/10 text-[var(--text-muted)]'
                  : 'border-black/10 text-[var(--text-muted)]'
              "
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>

      <!-- Photo gallery (if photos exist) -->
      <div
        v-if="project.photos.length > 0"
        class="px-6 md:px-12 py-16 border-b"
        :class="isDark ? 'border-white/5' : 'border-black/5'"
      >
        <div class="max-w-[1100px] mx-auto">
          <div class="section-label mb-6">// Screenshots</div>
          <div class="grid grid-cols-1 gap-3">
			  <div
			    v-for="(photo, i) in project.photos"
			    :key="i"
			    class="relative overflow-hidden border cursor-pointer group"
			    :class="isDark ? 'border-white/8' : 'border-black/8'"
			    @click="openLightbox(i)"
			  >
			    <img
			      :src="photo"
			      :alt="`${project.name} screenshot ${i + 1}`"
			      class="w-full h-auto transition-transform duration-500 group-hover:scale-[1.01]"
			    />
			    <div
			      class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
			      style="background: rgba(0,0,0,0.4);"
			    >
			      <v-icon icon="mdi-magnify-plus-outline" size="32" color="white" />
			    </div>
			  </div>
			</div>
        </div>
      </div>

      <!-- Main content grid -->
      <div class="px-6 md:px-12 py-20">
        <div class="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Left: main content -->
          <div class="lg:col-span-2 space-y-16">
            <!-- Overview -->
            <div>
              <div class="section-label mb-4">// Overview</div>
              <p class="text-[14px] leading-[1.8]" style="color: var(--text-secondary)">
                {{ project.overview }}
              </p>
            </div>
			<!-- Role -->
			<div>
			  <div class="section-label mb-4">// My Role</div>
			  <div
			    class="inline-flex items-center gap-2 font-mono text-[13px] px-4 py-2 border"
			    :class="isDark ? 'border-white/10' : 'border-black/10'"
			    style="color: var(--accent);"
			  >
			    <v-icon icon="mdi-account-outline" size="14" />
			    {{ project.role }}
			  </div>
			</div>

			<!-- Responsibilities -->
			<div>
			  <div class="section-label mb-6">// Responsibilities</div>
			  <div class="space-y-3">
			    <div
			      v-for="(item, i) in project.responsibilities"
			      :key="i"
			      class="flex items-start gap-3 group"
			    >
			      <div
			        class="flex-shrink-0 w-5 h-5 border flex items-center justify-center mt-0.5 transition-colors duration-200 group-hover:border-accent"
			        :class="isDark ? 'border-white/10' : 'border-black/10'"
			      >
			        <span style="color: var(--accent); font-size: 8px;">▸</span>
			      </div>
			      <span class="text-[13px] leading-relaxed" style="color: var(--text-secondary);">
			        {{ item }}
			      </span>
			    </div>
			  </div>
			</div>
            <!-- Objective -->
            <div>
              <div class="section-label mb-4">// Objective</div>
              <p class="text-[14px] leading-[1.8]" style="color: var(--text-secondary)">
                {{ project.objective }}
              </p>
            </div>

            <!-- Key Features -->
            <div>
              <div class="section-label mb-6">// Key Features</div>
              <div class="space-y-px" :class="isDark ? 'bg-white/5' : 'bg-black/5'">
                <div
                  v-for="(feature, i) in project.features"
                  :key="i"
                  class="flex items-start gap-4 px-5 py-4 transition-colors duration-200 group"
                  :class="
                    isDark
                      ? 'bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)]'
                      : 'bg-white hover:bg-[var(--bg-card-hover)]'
                  "
                >
                  <span
                    class="font-mono text-[12px] mt-0.5 flex-shrink-0 transition-colors duration-200"
                    style="color: var(--accent); opacity: 0.6"
                  >
                    {{ String(i + 1).padStart(2, '0') }}
                  </span>
                  <span class="text-[13px] leading-relaxed" style="color: var(--text-secondary)">
                    {{ feature }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Architecture -->
            <div>
              <div class="section-label mb-6">// Architecture Highlights</div>
              <div class="space-y-3">
                <div
                  v-for="(item, i) in project.architecture"
                  :key="i"
                  class="flex items-start gap-3 group"
                >
                  <div
                    class="flex-shrink-0 w-5 h-5 border flex items-center justify-center mt-0.5 transition-colors duration-200 group-hover:border-accent"
                    :class="isDark ? 'border-white/10' : 'border-black/10'"
                  >
                    <span style="color: var(--accent); font-size: 8px">▸</span>
                  </div>
                  <span class="text-[13px] leading-relaxed" style="color: var(--text-secondary)">
                    {{ item }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Lessons learned (if available) -->
            <div v-if="project.lessons?.length">
              <div class="section-label mb-6">// Lessons Learned</div>
              <div class="space-y-3">
                <div
                  v-for="(lesson, i) in project.lessons"
                  :key="i"
                  class="flex items-start gap-4 p-4 border transition-colors duration-200"
                  :class="
                    isDark
                      ? 'border-white/5 hover:border-accent/30'
                      : 'border-black/5 hover:border-accent/30'
                  "
                >
                  <v-icon
                    icon="mdi-lightbulb-outline"
                    size="15"
                    class="flex-shrink-0 mt-0.5"
                    style="color: var(--accent); opacity: 0.7"
                  />
                  <span class="text-[13px] leading-relaxed" style="color: var(--text-secondary)">
                    {{ lesson }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: sidebar -->
          <div class="space-y-8">
            <!-- Security -->
            <div class="p-6 border" :class="isDark ? 'border-white/8' : 'border-black/8'">
              <div class="section-label mb-5">// Security</div>
              <ul class="space-y-3">
                <li
                  v-for="item in project.security"
                  :key="item"
                  class="flex items-start gap-2 text-[14px] leading-relaxed"
                  style="color: var(--text-secondary)"
                >
                  <v-icon
                    icon="mdi-shield-check-outline"
                    size="13"
                    class="flex-shrink-0 mt-0.5"
                    style="color: var(--accent); opacity: 0.7"
                  />
                  {{ item }}
                </li>
              </ul>
            </div>

            <!-- Performance (if available) -->
            <div
              v-if="project.performance?.length"
              class="p-6 border"
              :class="isDark ? 'border-white/8' : 'border-black/8'"
            >
              <div class="section-label mb-5">// Performance</div>
              <ul class="space-y-3">
                <li
                  v-for="item in project.performance"
                  :key="item"
                  class="flex items-start gap-2 text-[14px] leading-relaxed"
                  style="color: var(--text-secondary)"
                >
                  <v-icon
                    icon="mdi-speedometer"
                    size="13"
                    class="flex-shrink-0 mt-0.5"
                    style="color: var(--accent); opacity: 0.7"
                  />
                  {{ item }}
                </li>
              </ul>
            </div>

            <!-- Arch tags -->
            <div class="p-6 border" :class="isDark ? 'border-white/8' : 'border-black/8'">
              <div class="section-label mb-5">// Components</div>
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="tag in project.archTags"
                  :key="tag.label"
                  class="flex items-center gap-1.5 font-mono text-[12px] px-2.5 py-1.5 border transition-all duration-200 hover:border-accent hover:text-accent cursor-default"
                  :class="
                    isDark
                      ? 'border-white/10 text-[var(--text-muted)]'
                      : 'border-black/10 text-[var(--text-muted)]'
                  "
                >
                  <v-icon :icon="tag.icon" size="11" />
                  {{ tag.label }}
                </div>
              </div>
            </div>

            <!-- Full stack -->
            <div class="p-6 border" :class="isDark ? 'border-white/8' : 'border-black/8'">
              <div class="section-label mb-5">// Full Stack</div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in project.stack"
                  :key="tech"
                  class="font-mono text-[13px] px-2.5 py-1.5 border transition-all duration-200 hover:border-accent hover:text-accent cursor-default"
                  :class="
                    isDark
                      ? 'border-white/10 text-[var(--text-muted)]'
                      : 'border-black/10 text-[var(--text-muted)]'
                  "
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom nav: prev / next project -->
      <div
        class="px-6 md:px-12 py-12 border-t"
        :class="isDark ? 'border-white/5' : 'border-black/5'"
      >
        <div class="max-w-[1100px] mx-auto flex items-center justify-between gap-4">
          <button
            v-if="prevProject"
            class="flex items-center gap-3 group font-mono text-[13px] tracking-wide uppercase transition-all duration-200 hover:text-accent"
            style="color: var(--text-muted)"
            @click="$router.push(prevProject.route)"
          >
            <v-icon
              icon="mdi-arrow-left"
              size="14"
              class="transition-transform duration-200 group-hover:-translate-x-1"
            />
            <div class="text-left">
              <div class="text-[12px] tracking-widest" style="color: var(--text-muted)">
                Previous
              </div>
              <div style="color: var(--text-primary)">{{ prevProject.name }}</div>
            </div>
          </button>
          <div v-else />

          <RouterLink
            to="/"
            class="flex items-center justify-center w-10 h-10 border no-underline transition-all duration-200 hover:border-accent hover:text-accent"
            :class="
              isDark
                ? 'border-white/10 text-[var(--text-muted)]'
                : 'border-black/10 text-[var(--text-muted)]'
            "
          >
            <v-icon icon="mdi-home-outline" size="16" />
          </RouterLink>

          <button
            v-if="nextProject"
            class="flex items-center gap-3 group font-mono text-[13px] tracking-wide uppercase transition-all duration-200 hover:text-accent text-right"
            style="color: var(--text-muted)"
            @click="$router.push(nextProject.route)"
          >
            <div>
              <div class="text-[12px] tracking-widest" style="color: var(--text-muted)">Next</div>
              <div style="color: var(--text-primary)">{{ nextProject.name }}</div>
            </div>
            <v-icon
              icon="mdi-arrow-right"
              size="14"
              class="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
          <div v-else />
        </div>
      </div>
    </main>

    <AppFooter />
    <AiChat />

    <!-- Lightbox -->
    <Transition name="lightbox">
      <div
        v-if="lightboxIndex !== null"
        class="fixed inset-0 z-[300] flex items-center justify-center p-4"
        style="background: rgba(0, 0, 0, 0.92)"
        @click.self="lightboxIndex = null"
      >
        <button
          class="absolute top-6 right-6 flex items-center justify-center w-10 h-10 border border-white/20 text-white/60 hover:text-white hover:border-white transition-all duration-200"
          @click="lightboxIndex = null"
        >
          <v-icon icon="mdi-close" size="18" />
        </button>

        <button
          v-if="lightboxIndex > 0"
          class="absolute left-6 flex items-center justify-center w-10 h-10 border border-white/20 text-white/60 hover:text-white hover:border-white transition-all duration-200"
          @click="lightboxIndex--"
        >
          <v-icon icon="mdi-arrow-left" size="18" />
        </button>

        <img
          :src="project.photos[lightboxIndex]"
          class="max-w-full max-h-[85vh] object-contain"
          :alt="`${project.name} screenshot ${lightboxIndex + 1}`"
        />

        <button
          v-if="lightboxIndex < project.photos.length - 1"
          class="absolute right-6 flex items-center justify-center w-10 h-10 border border-white/20 text-white/60 hover:text-white hover:border-white transition-all duration-200"
          @click="lightboxIndex++"
        >
          <v-icon icon="mdi-arrow-right" size="18" />
        </button>

        <div class="absolute bottom-6 font-mono text-[13px] text-white/40">
          {{ lightboxIndex + 1 }} / {{ project.photos.length }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'
import AppNav from '@/components/layout/AppNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AiChat from '@/components/ui/AiChat.vue'

const props = defineProps<{ project: Project }>()

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)
const lightboxIndex = ref<number | null>(null)

const openLightbox = (i: number) => {
  lightboxIndex.value = i
}

const currentIndex = computed(() => projects.findIndex((p) => p.id === props.project.id))
const prevProject = computed(() =>
  currentIndex.value > 0 ? projects[currentIndex.value - 1] : null,
)
const nextProject = computed(() =>
  currentIndex.value < projects.length - 1 ? projects[currentIndex.value + 1] : null,
)

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
onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
})
</script>

<style scoped>
.section-label {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
}
.text-accent {
  color: var(--accent);
}
.border-accent {
  border-color: var(--accent);
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.2s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
.group-title:hover {
  color: var(--accent) !important;
}
.group-title:hover .v-icon {
  opacity: 1 !important;
}
</style>
