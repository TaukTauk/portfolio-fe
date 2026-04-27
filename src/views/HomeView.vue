<template>
  <div class="min-h-screen">
    <AppNav />

    <main class="relative z-10">
      <HeroSection />
      <ApproachSection />
	  <ExperienceSection />
      <ProjectsSection />
      <OpenSourceSection />
      <SystemsSection />
      <StackSection />
      <ContactSection />
    </main>

    <AppFooter />
    <AiChat />
  </div>
</template>

<script setup lang="ts">
import AppNav from '@/components/layout/AppNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import ApproachSection from '@/components/home/ApproachSection.vue'
import ProjectsSection from '@/components/home/ProjectsSection.vue'
import OpenSourceSection from '@/components/home/OpenSourceSection.vue'
import SystemsSection from '@/components/home/SystemsSection.vue'
import StackSection from '@/components/home/StackSection.vue'
import ContactSection from '@/components/home/ContactSection.vue'
import AiChat from '@/components/ui/AiChat.vue'
import ExperienceSection from '@/components/home/ExperienceSection.vue'
</script>