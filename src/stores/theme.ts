import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const THEME_KEY = 'portfolio_theme'

function getInitialTheme(): boolean {
  const stored = localStorage.getItem(THEME_KEY)
  if (stored !== null) return stored === 'dark'
  return true // default dark
}

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref<boolean>(getInitialTheme())

  const toggle = () => {
    isDark.value = !isDark.value
    localStorage.setItem(THEME_KEY, isDark.value ? 'dark' : 'light')
  }

  watch(isDark, (val) => {
    document.documentElement.className = val ? 'theme-dark' : 'theme-light'
  }, { immediate: true })

  return { isDark, toggle }
})