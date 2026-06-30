<template>
  <section class="relative min-h-screen flex items-center px-6 md:px-12 pt-[60px]">
    <div class="max-w-[1100px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto w-full py-24">
      <!-- Eyebrow -->
      <div
        class="flex items-center gap-3 mb-8 font-mono text-[13px] tracking-[0.25em] uppercase text-(--text-muted)"
        v-motion-fade-visible
      >
        <span class="inline-block w-2 h-2 rounded-full" style="background: var(--accent);" />
        Security Engineer · Remote · ASEAN
      </div>

      <!-- Name -->
      <h1
        class="font-display font-extrabold leading-[1.0] tracking-tight mb-4"
        style="
          font-size: clamp(44px, 8vw, 88px);
          font-family: var(--display);
          color: var(--text-primary);
        "
      >
        Tauk Tauk<br />
        <span style="color: var(--accent)">Lin</span>
      </h1>

      <!-- Tagline -->
      <div
        class="font-mono mb-6"
        style="
          font-size: clamp(14px, 1.4vw, 16px);
          color: var(--text-secondary);
          letter-spacing: 0.05em;
        "
      >
        Security Engineer with a Full-Stack Development Background
      </div>

      <!-- Description -->
      <p
        class="font-mono leading-relaxed mb-12 max-w-[520px]"
        style="font-size: 16px; color: var(--text-muted)"
      >
        I secure infrastructure and platforms while building scalable backend systems — from Kubernetes security controls and HashiCorp Vault to production FastAPI services and containerized deployments.
      </p>

      <!-- Arch Diagram -->
      <div class="mb-12">
        <div
          class="font-mono text-[12px] tracking-[0.2em] uppercase mb-4"
          style="color: var(--text-muted)"
        >
          // system architecture
        </div>
        <ArchDiagram />
      </div>

      <!-- CTA Buttons -->
      <div class="flex flex-wrap gap-3">
        <a
          href="/#projects"
          class="hero-btn-primary font-mono text-[13px] tracking-[0.1em] uppercase px-7 py-3 flex items-center gap-2 no-underline transition-all duration-200"
          @click.prevent="scrollTo('projects')"
        >
          <v-icon icon="mdi-folder-outline" size="14" />
          View Projects
        </a>
        <a
          href="/#contact"
          class="hero-btn-outline font-mono text-[13px] tracking-[0.1em] uppercase px-7 py-3 flex items-center gap-2 no-underline transition-all duration-200"
          @click.prevent="scrollTo('contact')"
        >
          <v-icon icon="mdi-arrow-top-right" size="14" />
          Contact
        </a>
        <a
          href="https://github.com/TaukTauk"
          target="_blank"
          rel="noopener noreferrer"
          class="hero-btn-outline font-mono text-[13px] tracking-[0.1em] uppercase px-7 py-3 flex items-center gap-2 no-underline transition-all duration-200"
        >
          <v-icon icon="mdi-github" size="14" />
          GitHub
        </a>
      </div>
    </div>

    <!-- Decorative corner -->
    <div
      class="absolute bottom-12 right-12 font-mono text-[12px] tracking-widest hidden lg:block"
      style="color: var(--text-muted); writing-mode: vertical-rl"
    >
      SECURITY · SYSTEMS · INFRASTRUCTURE
    </div>
  </section>
</template>

<script setup lang="ts">
import ArchDiagram from '@/components/ui/ArchDiagram.vue'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
.hero-btn-primary {
  background: var(--accent);
  color: #fff;
  border: 1px solid var(--accent);
}
.hero-btn-primary:hover {
  opacity: 0.85;
  transform: translateY(-2px);
}

.hero-btn-outline {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
}
.hero-btn-outline:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-2px);
}
</style>
