import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import * as dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

const app = createApp(App)

app.use(createPinia())
app.use(router)

dayjs.locale('zh-cn')

app.mount('#app')
