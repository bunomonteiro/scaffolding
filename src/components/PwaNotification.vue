<template>
  <div v-if="offlineReady || needRefresh" class="pwa-toast">
    <div v-if="offlineReady" role="alert">
      <div class="message">
        <span>App ready to work offline</span>
      </div>
      <button @click="closePromptUpdateSW">
        Close
      </button>
    </div>
    <div v-if="needRefresh" role="alert">
      <div class="message">
        <span>New content available, click on reload button to update.</span>
      </div>
      <button @click="updateServiceWorker()">
        Reload
      </button>
      <button @click="closePromptUpdateSW">
        Close
      </button>
    </div>
  </div>
</template>

<script>
import useRegisterSW from '@/mixins/use-register-sw.mixin';

//const intervalMS = 60 * 60 * 1000; // 1h

export default {
  name: 'PwaNotification',
  mixins: [useRegisterSW],
  // methods: {
  //   handleSWManualUpdates(r) {
  //     r && setInterval(() => {
  //       r.update()
  //     }, intervalMS)
  //   }
  // }
}
</script>

<style>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 1;
  text-align: left;
  box-shadow: 3px 4px 5px 0 #8885;
}
.pwa-toast .message {
  margin-bottom: 8px;
}
.pwa-toast button {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
}
</style>