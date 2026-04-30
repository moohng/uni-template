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

  // 全局错误处理
  app.config.errorHandler = (err, instance, info) => {
    console.error('Vue Error:', err);
    console.log('Component Instance:', instance);
    console.log('Error Info:', info);
    // 这里可以集成日志上报逻辑
  };

  return {
    app,
  };
}
