import { createApp } from 'vue'
import App from './App.vue'
import router from './router.ts'
import './db.ts'
import './style.css'

const app = createApp(App)

app.use(router)
app.mount('#app')

app.config.errorHandler = (error) => {
  // TODO: Доработать обработку ошибок и отправку отчетов в Sentry
  console.error(error)
}
