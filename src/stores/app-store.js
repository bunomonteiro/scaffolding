import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

function themeInit() {
  // private
  const THEME_KEY = `${import.meta.env.VITE_APP_ALIAS}|THEME|DARK`
  const _dark = ref(document.querySelector('html').classList.contains('p-dark'))

  const storedDark = localStorage.getItem(THEME_KEY)

  if(storedDark != null) {
    _dark.value = JSON.parse(storedDark)
    
    if(_dark.value) {
      document.querySelector('html').classList.add('p-dark')
    }
  }

  localStorage.setItem(THEME_KEY, JSON.stringify(_dark.value));

  // ----------------------------------------------------------
  
  const dark = computed(() => _dark.value)  
  function toggle() {
    document.querySelector('html').classList.toggle('p-dark')
    _dark.value = !_dark.value

    localStorage.setItem(THEME_KEY, JSON.stringify(_dark.value));
  }

  return { dark, toggle }
}

export const useAppStore = defineStore('app', () => {
  const theme = themeInit()

  return { theme }
})
