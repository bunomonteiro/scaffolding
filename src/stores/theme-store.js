import { computed, reactive, toRaw } from 'vue'
import { defineStore } from 'pinia'
import { usePrimeVue } from 'primevue/config'
import { $t } from '@primevue/themes'
import Aura from '@primevue/themes/aura'
import Lara from '@primevue/themes/lara'
import Nora from '@primevue/themes/nora'

import { primaryColors, surfaces, presets as themePresets } from '@/shared/theme'

// Define the store
export const useThemeStore = defineStore('theme', () => {
  // #region Constants
  const THEME_KEY = `${import.meta.env.VITE_APP_ALIAS}|THEME`
  const PRIMEVUE_PRESETS = { Aura, Lara, Nora }
  const primevue = usePrimeVue()
  // #endregion Constants

  // #region Helpers
  const getColorPresets = () =>
    Object.keys(primaryColors).map((color) => ({
      name: primaryColors[color].name,
      palette: primaryColors[color].palette || {}
    }))

  const getSurfaces = () =>
    Object.keys(surfaces).map((surface) => ({
      name: surfaces[surface].name,
      palette: surfaces[surface].palette
    }))

  const getStoredTheme = () => {
    const stored = localStorage.getItem(THEME_KEY)
    return stored ? JSON.parse(stored) : null
  }

  const saveThemeToLocalStorage = (theme) => {
    localStorage.setItem(THEME_KEY, JSON.stringify(toRaw(theme)))
  }
  // #endregion Helpers

  // defaults
  const theme = reactive({
    dark: document.querySelector('html').classList.contains('p-dark'),
    presets: { theme: 'Aura', primary: 'orange', surface: 'zinc' },
    ripple: false
  })

  const storedTheme = getStoredTheme()
  if (storedTheme) {
    Object.assign(theme, storedTheme)
  } else {
    saveThemeToLocalStorage(theme)
  }

  const colorsPrimary = computed(() => getColorPresets())
  const colorsSurfaces = computed(() => getSurfaces())
  const colorsPresets = computed(() => PRIMEVUE_PRESETS)

  function applyTheme() {
    if (theme.dark) {
      document.querySelector('html').classList.add('p-dark')
    } else {
      document.querySelector('html').classList.remove('p-dark')
    }

    primevue.config.ripple = theme.ripple

    const selectedColor = colorsPresets.value[theme.presets.theme]
    const selectedSurfacePalette = colorsSurfaces.value.find(
      (s) => s.name === theme.presets.surface
    )?.palette

    $t()
      .preset(selectedColor)
      .preset(getPresetExtension(theme.presets.primary, theme.presets.theme))
      .surfacePalette(selectedSurfacePalette)
      .use({ useDefaultOptions: true })
  }

  function getPresetExtension(primaryColor, theme) {
    const color = colorsPrimary.value.find((c) => c.name === primaryColor)

    if (color.name === 'noir') {
      return themePresets.Noir
    } else {
      const colorScheme =
        theme === 'Nora'
          ? themePresets.Nora.semantic.colorScheme
          : themePresets.Gray.semantic.colorScheme

      return {
        semantic: {
          primary: color.palette,
          colorScheme
        }
      }
    }
  }

  function toggleMode() {
    theme.dark = !theme.dark
    document.querySelector('html').classList.toggle('p-dark')
    saveThemeToLocalStorage(theme)
  }

  function toggleRipple() {
    theme.ripple = !theme.ripple
    primevue.config.ripple = theme.ripple
    saveThemeToLocalStorage(theme)
  }

  function savePresets(newPresets) {
    theme.presets = newPresets
    applyTheme()
    saveThemeToLocalStorage(theme)
  }

  // Initial application of theme
  applyTheme()

  return {
    dark: computed(() => theme.dark),
    ripple: computed(() => theme.ripple),
    presets: computed(() => theme.presets),
    colors: {
      presets: colorsPresets,
      primary: colorsPrimary,
      surfaces: colorsSurfaces
    },
    toggleMode,
    toggleRipple,
    savePresets,
    applyTheme,
    getPresetExtension
  }
})
