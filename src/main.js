import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { registerSW } from 'virtual:pwa-register'

import PrimevuePlugin from '@/plugins/primevue'
import DayjsPlugin from '@/plugins/dayjs'
import HttpClient from '@/plugins/http-client'

import App from '@/App.vue'
import RouterFactory from "@/router";

const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {}
})

const app = createApp(App)

const pinia = createPinia()
const router = RouterFactory(pinia)

app.use(pinia)
app.use(router)

app.use(PrimevuePlugin)
app.use(DayjsPlugin)
app.use(HttpClient)

app.mount('#app')
