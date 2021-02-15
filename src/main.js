import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Swipe, SwipeItem, Lazyload } from 'vant';

createApp(App)
.use(Swipe)
.use(SwipeItem)
.use(Lazyload, { loading: require('./assets/images/default-img.png') })
.use(store)
.use(router)
.mount('#app')
