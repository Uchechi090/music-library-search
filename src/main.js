import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import store from './store/index'

import './assets/main.css'
import './components/icons'

const app = createApp(App)

app.use(store)

app
.component('fa-icon', FontAwesomeIcon)
.mount('#app')
