import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/css/main.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

import { useTheme } from './composables/useTheme';
const { theme, setTheme} = useTheme();
setTheme(theme.value)

app.mount('#app')
