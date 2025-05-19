import './assets/main.css'
import vAutowidth from '@/directives/v-autowidth'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.directive('autowidth', vAutowidth)
app.mount('#app')
