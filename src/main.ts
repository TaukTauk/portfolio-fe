import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import ToastPlugin from './plugins/toast'
import './assets/main.css'

createApp(App)
  .use(createPinia())
  .use(router)
  .use(vuetify)
  .use(ToastPlugin)
  .mount('#app')