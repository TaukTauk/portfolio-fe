<template>
  <!-- FAB -->
  <button
    class="chat-fab fixed bottom-8 right-8 z-50 flex items-center gap-3 font-mono text-[13px] tracking-widest uppercase transition-all duration-300"
    :class="chatStore.isOpen ? 'chat-fab--open' : ''"
    @click="chatStore.toggle()"
  >
    <span class="chat-fab-icon flex items-center justify-center w-12 h-12">
      <v-icon :icon="chatStore.isOpen ? 'mdi-close' : 'mdi-robot-outline'" size="20" />
    </span>
    <span
      class="chat-fab-label pr-4 hidden md:block transition-all duration-300"
      :class="chatStore.isOpen ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'"
    >
      Ask AI
    </span>
  </button>

  <!-- Chat window -->
  <Transition name="chat-window">
    <div
      v-if="chatStore.isOpen"
      class="chat-window fixed bottom-28 right-8 z-50 flex flex-col"
      :class="isDark ? 'bg-[#1e1e1e]' : 'bg-white'"
    >
      <!-- Header -->
      <div
        class="flex items-center justify-between px-5 py-4 border-b flex-shrink-0"
        :class="isDark ? 'border-white/5' : 'border-black/5'"
      >
        <div class="flex items-center gap-3">
          <div
            class="flex items-center justify-center w-8 h-8 border"
            style="border-color: rgba(224, 49, 49, 0.3); color: var(--accent)"
          >
            <v-icon icon="mdi-robot-outline" size="15" />
          </div>
          <div>
            <div class="font-mono text-[14px] font-bold" style="color: var(--text-primary)">
              Ask about Tauk Tauk Lin
            </div>
            <div class="flex items-center gap-2 mt-0.5">
              <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
              <span class="font-mono text-[12px]" style="color: var(--text-muted)">
                AI · Knows his projects &amp; background
              </span>
            </div>
          </div>
        </div>

        <!-- Header actions -->
        <div class="flex items-center gap-2">
          <!-- Clear session button -->
          <button
            v-if="messages.length > 0"
            class="flex items-center justify-center w-7 h-7 border transition-all duration-200 hover:border-accent hover:text-accent"
            :class="isDark ? 'border-white/10 text-[var(--text-muted)]' : 'border-black/10 text-[var(--text-muted)]'"
            title="Clear conversation"
            @click="clearSession"
          >
            <v-icon icon="mdi-delete-outline" size="14" />
          </button>

          <!-- Close button -->
          <button
            class="flex items-center justify-center w-7 h-7 border transition-all duration-200 hover:border-accent hover:text-accent"
            :class="isDark ? 'border-white/10 text-[var(--text-muted)]' : 'border-black/10 text-[var(--text-muted)]'"
            @click="chatStore.close()"
          >
            <v-icon icon="mdi-close" size="14" />
          </button>
        </div>
      </div>

      <!-- Messages -->
		<div
		  ref="messagesRef"
		  class="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4"
		  style="min-height: 0"
		>
		  <div
		    v-for="(msg, i) in chatStore.messages"
		    :key="i"
		    class="flex items-start gap-3"
		    :class="msg.role === 'user' ? 'flex-row-reverse' : ''"
		  >
		    <div
		      class="flex-shrink-0 flex items-center justify-center w-7 h-7 border font-mono text-[12px] font-bold"
		      :class="
		        msg.role === 'assistant'
		          ? 'border-accent/30 text-accent'
		          : isDark
		            ? 'border-white/10 text-[var(--text-muted)]'
		            : 'border-black/10 text-[var(--text-muted)]'
		      "
		    >
		      {{ msg.role === 'assistant' ? 'AI' : 'U' }}
		    </div>
		    <div
		      class="chat-bubble font-mono text-[14px] leading-relaxed px-4 py-3"
		      :class="msg.role === 'assistant' ? 'chat-bubble--ai' : 'chat-bubble--user'"
		    >
		      {{ msg.content }}
		    </div>
		  </div>

		  <!-- Streaming bubble -->
		  <div v-if="isStreaming" class="flex items-start gap-3">
		    <div
		      class="flex-shrink-0 flex items-center justify-center w-7 h-7 border font-mono text-[12px] font-bold"
		      style="border-color: rgba(224, 49, 49, 0.3); color: var(--accent)"
		    >
		      AI
		    </div>
		    <div class="chat-bubble chat-bubble--ai font-mono text-[14px] leading-relaxed px-4 py-3">
		      {{ streamingText }}<span class="streaming-cursor">▋</span>
		    </div>
		  </div>

		  <!-- Typing indicator (while waiting for API) -->
		  <div v-if="chatStore.isLoading" class="flex items-start gap-3">
		    <div
		      class="flex-shrink-0 flex items-center justify-center w-7 h-7 border font-mono text-[12px] font-bold"
		      style="border-color: rgba(224, 49, 49, 0.3); color: var(--accent)"
		    >
		      AI
		    </div>
		    <div class="chat-bubble chat-bubble--ai px-4 py-3">
		      <div class="flex items-center gap-1.5">
		        <span
		          v-for="n in 3"
		          :key="n"
		          class="w-1.5 h-1.5 rounded-full bg-accent animate-bounce"
		          :style="{ animationDelay: `${(n - 1) * 0.15}s` }"
		        />
		      </div>
		    </div>
		  </div>
		</div>

      <!-- Suggestions -->
      <div
        v-if="chatStore.suggestions.length > 0 && !chatStore.isLoading"
        class="px-4 pb-3 flex flex-wrap gap-2 flex-shrink-0"
      >
        <button
          v-for="s in chatStore.suggestions"
          :key="s"
          class="font-mono text-[12px] px-3 py-1.5 border transition-all duration-200 hover:border-accent hover:text-accent"
          :class="isDark ? 'border-white/8 text-[var(--text-muted)]' : 'border-black/8 text-[var(--text-muted)]'"
          @click="sendMessage(s)"
        >
          {{ s }}
        </button>
      </div>

      <!-- Input -->
      <div
        class="flex gap-2 px-4 py-3 border-t flex-shrink-0"
        :class="isDark ? 'border-white/5' : 'border-black/5'"
      >
        <input
          ref="inputRef"
          v-model="chatStore.input"
          class="chat-input flex-1 font-mono text-[14px] px-3 py-2 outline-none transition-all duration-200"
          :class="isDark ? 'bg-[#252525] text-[var(--text-primary)]' : 'bg-[#f5f4f0] text-[var(--text-primary)]'"
          placeholder="Ask anything..."
          :disabled="chatStore.isLoading"
          @keydown="handleKeydown"
        />
        <button
          class="flex items-center justify-center w-10 h-10 flex-shrink-0 transition-all duration-200"
          style="background: var(--accent)"
          :disabled="chatStore.isLoading || !chatStore.input.trim()"
          :style="{ opacity: chatStore.isLoading || !chatStore.input.trim() ? '0.4' : '1' }"
          @click="sendMessage()"
        >
          <v-icon icon="mdi-arrow-up" size="16" color="white" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { useChatStore, DEFAULT_SUGGESTIONS } from '@/stores/chat'

const themeStore = useThemeStore()
const chatStore = useChatStore()

const isDark = computed(() => themeStore.isDark)
const isOpen = computed(() => chatStore.isOpen)
const messages = computed(() => chatStore.messages)

const inputRef = ref<HTMLInputElement | null>(null)
const messagesRef = ref<HTMLElement | null>(null)

const API_URL = import.meta.env.VITE_AI_API_URL || 'http://localhost:8000'
const API_KEY = import.meta.env.VITE_API_KEY || ''

// Streaming state
const isStreaming = ref(false)
const streamingText = ref('')

watch(isOpen, async (val) => {
  if (val) {
    await nextTick()
    inputRef.value?.focus()
    scrollToBottom()
  }
})

watch(messages, async () => {
  await nextTick()
  scrollToBottom()
}, { deep: true })

watch(streamingText, async () => {
  await nextTick()
  scrollToBottom()
})

const scrollToBottom = () => {
  if (messagesRef.value) {
    messagesRef.value.scrollTop = messagesRef.value.scrollHeight
  }
}

const typewriterEffect = (text: string): Promise<void> => {
  return new Promise((resolve) => {
    isStreaming.value = true
    streamingText.value = ''
    let i = 0
    // Faster for longer texts, slower for short ones
    const speed = Math.max(8, Math.min(20, Math.floor(2000 / text.length)))
    const interval = setInterval(() => {
      streamingText.value += text[i]
      i++
      if (i >= text.length) {
        clearInterval(interval)
        isStreaming.value = false
        resolve()
      }
    }, speed)
  })
}

const sendMessage = async (text?: string) => {
  const content = (text || chatStore.input).trim()
  if (!content || chatStore.isLoading || isStreaming.value) return

  chatStore.input = ''
  chatStore.suggestions = []
  chatStore.messages.push({ role: 'user', content })
  chatStore.isLoading = true

  try {
    const res = await fetch(`${API_URL}/api/chat`, {
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/json',
	    'X-API-Key': API_KEY,
	  },
	  body: JSON.stringify({
	    session_id: chatStore.sessionId,
	    message: content,
	  }),
	})

    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const data = await res.json()
    chatStore.isLoading = false

    // Animate the response
    await typewriterEffect(data.message)

    // Commit to store after animation
    chatStore.messages.push({ role: 'assistant', content: data.message })
    streamingText.value = ''
    chatStore.suggestions = data.suggestions || []
  } catch (err) {
    console.error('Chat error:', err)
    chatStore.isLoading = false
    isStreaming.value = false
    streamingText.value = ''
    chatStore.messages.push({
      role: 'assistant',
      content: 'Sorry, the AI service is currently unavailable. Please try again later.',
    })
    chatStore.suggestions = []
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

const clearSession = () => {
  chatStore.messages = []
  chatStore.suggestions = [...DEFAULT_SUGGESTIONS]
  streamingText.value = ''
  isStreaming.value = false
  localStorage.removeItem('portfolio_chat_session_id')
  localStorage.removeItem('portfolio_chat_messages')
  localStorage.removeItem('portfolio_chat_suggestions')
  chatStore.sessionId = crypto.randomUUID()
  localStorage.setItem('portfolio_chat_session_id', chatStore.sessionId)
}
</script>

<style scoped>
.text-accent { color: var(--accent); }
.border-accent { border-color: var(--accent); }
.bg-accent { background: var(--accent); }

/* FAB */
.chat-fab {
  background: var(--accent);
  color: white;
  border: 1px solid var(--accent);
  box-shadow: 0 4px 24px rgba(224, 49, 49, 0.3);
}
.chat-fab:hover {
  box-shadow: 0 6px 32px rgba(224, 49, 49, 0.45);
  transform: translateY(-2px);
}
.chat-fab-icon { flex-shrink: 0; }

/* Window */
.chat-window {
  width: 380px;
  height: 520px;
  border: 1px solid var(--border);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
}

@media (max-width: 480px) {
  .chat-window {
    width: calc(100vw - 32px);
    right: 16px;
    bottom: 88px;
  }
}

/* Bubbles */
.chat-bubble {
  max-width: 82%;
  word-break: break-word;
  white-space: pre-wrap;
}
.chat-bubble--ai {
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text-primary);
  border-left: 2px solid var(--accent);
}
.chat-bubble--user {
  background: var(--accent-dim);
  border: 1px solid rgba(224, 49, 49, 0.2);
  color: var(--text-primary);
}

/* Input */
.chat-input {
  border: 1px solid var(--border);
}
.chat-input:focus {
  border-color: var(--accent);
}
.chat-input::placeholder {
  color: var(--text-muted);
}

/* Transition */
.chat-window-enter-active,
.chat-window-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.chat-window-enter-from,
.chat-window-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.98);
}

.streaming-cursor {
  display: inline-block;
  color: var(--accent);
  animation: blink 0.7s step-end infinite;
  margin-left: 1px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>