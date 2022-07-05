import { defineConfig } from 'vite'
import { createVuePlugin as vue } from "vite-plugin-vue2";
import { VitePWA } from 'vite-plugin-pwa';
import 'dotenv/config';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      // devOptions: {
      //   enabled: true,
      //   navigateFallback: 'index.html',
      // },
      registerType: 'autoUpdate',
      base: '/',
      includeAssets: ["img/icons/favicon.png", "/img/icons/apple-touch-icon.png"],
      manifest: {
        name: process.env.VITE_APP_NAME,
        short_name: process.env.VITE_APP_ALIAS,
        lang: 'pt-br',
        theme_color: '#263238',
        background_color: '#FFFFFF',
        strategies: "injectManifest",
        icons: [
          {
            src: "img/icons/icon-16.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: "img/icons/icon-32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "img/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "img/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "img/icons/maskable_icon_x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          },
        ]
      }
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./src"),
      "~~": path.resolve(__dirname, "./"),
      "@@": path.resolve(__dirname, "./"),
      "assets": path.resolve(__dirname, "./src/assets"),
      "components": path.resolve(__dirname, "./src/components"),
      "commons": path.resolve(__dirname, "./src/commons"),
      "mixins": path.resolve(__dirname, "./src/mixins"),
      "plugins": path.resolve(__dirname, "./src/plugins"),
      "router": path.resolve(__dirname, "./src/router"),
      "services": path.resolve(__dirname, "./src/services"),
      "store": path.resolve(__dirname, "./src/store"),
      "views": path.resolve(__dirname, "./src/views"),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  build: {
    chunkSizeWarningLimit: 600,
    cssCodeSplit: false
  },
})
