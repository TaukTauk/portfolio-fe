<template>
  <div class="arch-wrapper" ref="wrapperRef">
    <!-- Nodes -->
    <div class="arch-nodes">
      <div
        v-for="(node, i) in nodes"
        :key="node.id"
        :ref="
          (el) => {
            if (el) nodeRefs[i] = el as HTMLElement
          }
        "
        class="arch-node font-mono text-[13px] tracking-[0.08em] uppercase cursor-default select-none transition-all duration-200"
        :class="{ 'arch-node--active': activeNode === node.id }"
        @mouseenter="activeNode = node.id"
        @mouseleave="activeNode = null"
      >
        <v-icon :icon="node.icon" size="13" class="mr-1" />
        {{ node.label }}

        <!-- Tooltip -->
        <Transition name="tooltip">
          <div v-if="activeNode === node.id" class="arch-tooltip font-mono text-[12px]">
            {{ node.desc }}
          </div>
        </Transition>
      </div>
    </div>

    <!-- SVG connectors -->
    <svg
      class="arch-svg"
      :width="svgWidth"
      :height="svgHeight"
      :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
    >
      <defs>
        <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" :fill="arrowColor" opacity="0.6" />
        </marker>

        <!-- Animated dash -->
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" :stop-color="accentColor" stop-opacity="0.1" />
          <stop offset="50%" :stop-color="accentColor" stop-opacity="0.8" />
          <stop offset="100%" :stop-color="accentColor" stop-opacity="0.1" />
        </linearGradient>
      </defs>

      <!-- Connection lines -->
      <g v-for="(conn, i) in connections" :key="i">
        <!-- Base dashed line -->
        <line
          :x1="conn.x1"
          :y1="conn.y1"
          :x2="conn.x2"
          :y2="conn.y2"
          :stroke="isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'"
          stroke-width="1"
          stroke-dasharray="4 4"
        />
        <!-- Animated accent line -->
        <line
          :x1="conn.x1"
          :y1="conn.y1"
          :x2="conn.x2"
          :y2="conn.y2"
          stroke="url(#lineGrad)"
          stroke-width="1.5"
          stroke-dasharray="4 20"
          marker-end="url(#arrowhead)"
          class="conn-line"
          :style="{ animationDelay: `${i * 0.3}s` }"
        />
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)
const accentColor = '#e03131'
const arrowColor = computed(() => accentColor)

const wrapperRef = ref<HTMLElement | null>(null)
const nodeRefs = reactive<HTMLElement[]>([])
const activeNode = ref<string | null>(null)

const svgWidth = ref(0)
const svgHeight = ref(60)

interface Connection {
  x1: number
  y1: number
  x2: number
  y2: number
}
const connections = ref<Connection[]>([])

const nodes = [
  {
    id: 'client',
    label: 'Client',
    icon: 'mdi-monitor',
    desc: 'Vue.js frontend — user interface layer',
  },
  {
    id: 'api',
    label: 'API',
    icon: 'mdi-api',
    desc: 'FastAPI — REST endpoints',
  },
  {
    id: 'service',
    label: 'Service Layer',
    icon: 'mdi-cog-outline',
    desc: 'Business logic — validation, workflows',
  },
  {
    id: 'database',
    label: 'Database',
    icon: 'mdi-database-outline',
    desc: 'PostgreSQL + Redis (cache) — data persistence',
  },
]

const computeConnections = async () => {
  await nextTick()
  if (!wrapperRef.value) return

  const wrapperRect = wrapperRef.value.getBoundingClientRect()
  svgWidth.value = wrapperRect.width

  const newConns: Connection[] = []

  for (let i = 0; i < nodeRefs.length - 1; i++) {
    const from = nodeRefs[i]
    const to = nodeRefs[i + 1]
    if (!from || !to) continue

    const fromRect = from.getBoundingClientRect()
    const toRect = to.getBoundingClientRect()

    const x1 = fromRect.right - wrapperRect.left
    const y1 = fromRect.top - wrapperRect.top + fromRect.height / 2
    const x2 = toRect.left - wrapperRect.left
    const y2 = toRect.top - wrapperRect.top + toRect.height / 2

    newConns.push({ x1, y1, x2, y2 })
  }

  connections.value = newConns
}

const observer = new ResizeObserver(computeConnections)

onMounted(() => {
  computeConnections()
  if (wrapperRef.value) observer.observe(wrapperRef.value)
})

onUnmounted(() => observer.disconnect())
</script>

<style scoped>
.arch-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.arch-nodes {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.arch-svg {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
  overflow: visible;
}

.arch-node {
  position: relative;
  padding: 8px 16px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 6px;
  transition:
    border-color 0.2s,
    color 0.2s,
    transform 0.2s,
    background 0.2s;
}

.arch-node:hover,
.arch-node--active {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-dim);
  transform: translateY(-2px);
}

.arch-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  padding: 5px 10px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text-muted);
  pointer-events: none;
  z-index: 10;
}
.arch-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: var(--border);
}

.tooltip-enter-active,
.tooltip-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(4px);
}

/* Animated dash flow */
.conn-line {
  animation: dashFlow 2s linear infinite;
  stroke-dashoffset: 24;
}

@keyframes dashFlow {
  from {
    stroke-dashoffset: 24;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>
