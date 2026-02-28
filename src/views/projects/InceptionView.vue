<template>
  <ProjectLayout :project="project" />
</template>

<script setup lang="ts">
import ProjectLayout from '@/components/layout/ProjectLayout.vue'
import { projects } from '@/data/projects'
const project = projects.find(p => p.id === 'inception')!
</script>
