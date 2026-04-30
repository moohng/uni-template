import { createSSRApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';

import 'virtual:uno.css';

export function createApp() {
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);

  const app = createSSRApp(App);
  app.use(pinia);

  return {
    app,
  };
}
