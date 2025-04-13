<script setup>
import { RouterView, useRoute } from 'vue-router'
import { reactive } from 'vue'

const route = useRoute()
const model = reactive({
  menu: [
    { label: 'Início', icon: 'pi pi-home', route: '/' },
    { label: 'Sobre', icon: 'pi pi-info-circle', route: '/about' },
  ]
})
</script>

<template>
  <header>
    <Menubar :model="model.menu" class="flext items-center justify-center">
      <template #item="{ item, props, hasSubmenu }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom
          :class="{ 'text-teal-400': route.path === item.route }">
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action"
          :class="{ 'text-teal-400': route.path === item.route }">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
        </a>
      </template>
    </Menubar>
  </header>

  <RouterView class="page" />
</template>
