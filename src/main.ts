import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
import vClickOutside from 'click-outside-vue3'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vClickOutside)

app.mount('#app')
