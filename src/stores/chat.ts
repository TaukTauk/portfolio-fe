import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const SESSION_KEY = 'portfolio_chat_session_id'
const MESSAGES_KEY = 'portfolio_chat_messages'
const SUGGESTIONS_KEY = 'portfolio_chat_suggestions'

export const DEFAULT_SUGGESTIONS = [
  'What projects has he worked on?',
  'What is his tech stack?',
  'Tell me about his experience at DatTech',
  'What systems projects has he built?',
  'Is he available for opportunities?',
]

function getOrCreateSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY)
  if (!id) {
    id = uuidv4()
    localStorage.setItem(SESSION_KEY, id)
  }
  return id
}

function loadMessages(): ChatMessage[] {
  try {
    const stored = localStorage.getItem(MESSAGES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function loadSuggestions(): string[] {
  try {
    const stored = localStorage.getItem(SUGGESTIONS_KEY)
    return stored ? JSON.parse(stored) : DEFAULT_SUGGESTIONS
  } catch {
    return DEFAULT_SUGGESTIONS
  }
}

export const useChatStore = defineStore('chat', () => {
  const isOpen = ref(false)
  const isLoading = ref(false)
  const input = ref('')
  const messages = ref<ChatMessage[]>(loadMessages())
  const sessionId = ref<string>(getOrCreateSessionId())
  const suggestions = ref<string[]>(loadSuggestions())

  watch(messages, (val) => {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(val))
  }, { deep: true })

  watch(suggestions, (val) => {
    localStorage.setItem(SUGGESTIONS_KEY, JSON.stringify(val))
  }, { deep: true })

  const toggle = () => { isOpen.value = !isOpen.value }
  const close = () => { isOpen.value = false }

  return { isOpen, isLoading, input, messages, sessionId, suggestions, toggle, close }
})