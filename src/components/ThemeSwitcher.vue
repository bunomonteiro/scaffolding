<script setup>
import { computed, reactive } from 'vue';

import { useThemeStore } from '@/stores/theme-store'

const themeStore = useThemeStore()

const model = reactive({
  iconClass: computed(() => { return viewModel.themeStore.dark ? 'pi-sun' : 'pi-moon' }),
  theme: themeStore.presets.theme || 'Aura',
  rippleActive: computed(() => { return themeStore.ripple }),
  presets: Object.keys(themeStore.colors.presets),
  selectedPrimaryColor: themeStore.presets.primary || 'noir',
  primaryColors: themeStore.colors.primary,
  selectedSurfaceColor: themeStore.presets.surface || 'gray',
  surfaces: themeStore.colors.surfaces
})

const viewModel = {
  themeStore,
  save() {
    viewModel.themeStore.savePresets({
      theme: model.theme,
      primary: model.selectedPrimaryColor,
      surface: model.selectedSurfaceColor
    })
  },
  toggleThemeMode() {
    viewModel.themeStore.toggleMode()
  },
  updateColors(type, color) {
    if (type === 'primary') model.selectedPrimaryColor = color.name
    else if (type === 'surface') model.selectedSurfaceColor = color.name

    viewModel.save()
  },
  onPresetChange(value) {
    model.theme = value

    viewModel.save()
  },
  toggleRipple() {
    viewModel.themeStore.toggleRipple()
  },
}
</script>

<template>
  <div class="fixed z-50 top-0 right-0 flex justify-end p-2 mb-4">
    <ul class="flex list-none m-0 p-0 gap-2 items-center">
      <li>
        <button type="button"
          class="inline-flex w-8 h-8 p-0 items-center justify-center bg-surface-0 dark:bg-surface-800 border border-surface-200 dark:border-surface-600 rounded"
          @click="viewModel.toggleThemeMode">
          <i :class="`dark:text-white pi ${model.iconClass}`"></i>
        </button>
      </li>
      <li class="relative">
        <button v-styleclass="{
          selector: '@next',
          enterFromClass: 'hidden',
          enterActiveClass: 'animate-scalein',
          leaveToClass: 'hidden',
          leaveActiveClass: 'animate-fadeout',
          hideOnOutsideClick: true,
        }" type="button"
          class="inline-flex w-8 h-8 p-0 items-center justify-center bg-surface-0 dark:bg-surface-800 border border-surface-200 dark:border-surface-600 rounded">
          <i class="pi pi-palette dark:text-white"></i>
        </button>

        <div
          class="absolute top-[2.5rem] right-0 hidden w-[16rem] p-3 bg-white dark:bg-surface-800 rounded-md shadow border border-surface-200 dark:border-surface-700 flex-col justify-start items-start gap-3.5 inline-flex origin-top z-10">
          <div class="flex-col justify-start items-start gap-2 inline-flex pr-4">
            <span class="text-sm font-medium">Primary Colors</span>
            <div class="self-stretch justify-start items-start gap-2 inline-flex flex-wrap">
              <button v-for="primaryColor of model.primaryColors" :key="primaryColor.name" type="button"
                :title="primaryColor.name" @click="viewModel.updateColors('primary', primaryColor)"
                class="outline outline-2 outline-offset-1 outline-transparent cursor-pointer p-0 rounded-[50%] w-5 h-5"
                :style="{
                  backgroundColor: `${primaryColor.name === 'noir' ? 'var(--text-color)' : primaryColor.palette['500']}`,
                  outlineColor: `${model.selectedPrimaryColor === primaryColor.name ? 'var(--p-primary-color)' : ''}`,
                }"></button>
            </div>
          </div>
          <div class="flex-col justify-start items-start gap-2 inline-flex pr-2">
            <span class="text-sm font-medium">Surface Colors</span>
            <div class="self-stretch justify-start items-start gap-2 inline-flex">
              <button v-for="surface of model.surfaces" :key="surface.name" type="button" :title="surface.name"
                @click="viewModel.updateColors('surface', surface)"
                class="outline outline-2 outline-offset-1 outline-transparent cursor-pointer p-0 rounded-[50%] w-5 h-5"
                :style="{
                  backgroundColor: `${surface.palette['500']}`,
                  outlineColor: `${model.selectedSurfaceColor === surface.name ? 'var(--p-primary-color)' : ''}`,
                }"></button>
            </div>
          </div>
          <div class="flex-col justify-start items-start gap-2 inline-flex w-full">
            <span class="text-sm font-medium">Preset</span>
            <div
              class="inline-flex p-[0.28rem] items-start gap-[0.28rem] rounded-[0.71rem] border border-[#00000003] w-full">
              <SelectButton v-model="model.theme" @update:modelValue="viewModel.onPresetChange" :options="model.presets"
                :unselectable="false" />
            </div>
          </div>
          <div class="inline-flex flex-col justify-start items-start gap-2 w-full pt-4 pb-2">
            <span class="text-sm font-medium m-0">Ripple Effect</span>
            <ToggleSwitch :modelValue="model.rippleActive" @update:modelValue="viewModel.toggleRipple" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>